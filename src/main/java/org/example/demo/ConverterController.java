
package org.example.demo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ConverterController {

    private final ConverterService converterService;
    private final History history;

    public ConverterController(ConverterService converterService, History history) {
        this.converterService = converterService;
        this.history = history;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("conversions", converterService.getAvailableConversions());
        model.addAttribute("history", history.getAll());
        return "index";
    }

    @GetMapping("/convert")
    public String convert(@RequestParam(required = false) String value, @RequestParam(required = false) String type, Model model) {

        model.addAttribute("conversions", converterService.getAvailableConversions());
        model.addAttribute("history", history.getAll());
        model.addAttribute("inputValue", value);
        model.addAttribute("selectedType", type);

        var available = converterService.getAvailableConversions();

        // Пустая форма
        if (value == null || value.isBlank() || type == null) {
            return "index";
        }
        if (!available.containsKey(type)) {
            return "redirect:/";
        }
        // Проверка корректности ввода
        double numValue;
        try {
            numValue = Double.parseDouble(value.replace(',', '.'));
        } catch (NumberFormatException e) {
            model.addAttribute("error", "Введите корректное числовое значение");
            return "index";
        }
        // Конвертация с обработкой ошибок корректности ввода
        try {
            String result = converterService.convert(numValue, type);
            model.addAttribute("result", result);
            history.add(result);
            model.addAttribute("history", history.getAll());
        } catch (IllegalArgumentException e) {
            model.addAttribute("error", e.getMessage());
        }

        return "index";
    }

    @PostMapping("/clear")
    public String clearHistory() {
        history.clear();
        return "redirect:/";
    }
}