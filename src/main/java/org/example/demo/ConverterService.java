package org.example.demo;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ConverterService {

    public Map<String, String> getAvailableConversions() {
        Map<String, String> map = new HashMap<>();
        map.put("m-to-km",   "Метры в Километры");
        map.put("km-to-m",   "Километры в Метры");
        map.put("m-to-cm",   "Метры в Сантиметры");
        map.put("cm-to-m",   "Сантиметры в Метры");
        map.put("m-to-mm",   "Метры в Миллиметры");

        map.put("kg-to-g",   "Килограммы в Граммы");
        map.put("g-to-kg",   "Граммы в Килограммы");
        map.put("kg-to-t",   "Килограммы в Тонны");

        map.put("c-to-f",    "Цельсий в Фаренгейт");
        map.put("f-to-c",    "Фаренгейт в Цельсий");
        map.put("c-to-k",    "Цельсий в Кельвин");
        map.put("k-to-c",    "Кельвин в Цельсий");
        return map;
    }

    public String convert(double value, String type) {
        invalidInput(value, type);
        //Конвертация значения по типу
        double result = switch (type) {
            case "m-to-km"  -> value / 1000.0;
            case "km-to-m"  -> value * 1000.0;
            case "m-to-cm"  -> value * 100.0;
            case "cm-to-m"  -> value / 100.0;
            case "m-to-mm"  -> value * 1000.0;
            case "kg-to-g"  -> value * 1000.0;
            case "g-to-kg"  -> value / 1000.0;
            case "kg-to-t"  -> value / 1000.0;
            case "c-to-f"   -> value * 9.0 / 5.0 + 32.0;
            case "f-to-c"   -> (value - 32.0) * 5.0 / 9.0;
            case "c-to-k"   -> value + 273.15;
            case "k-to-c"   -> value - 273.15;
            default -> throw new IllegalArgumentException("Неизвестный тип: " + type);
        };

        return formatResult(value, result, type);
    }
    //Для формирования результата, что из чего конвертируется
    private String[] getUnits(String type) {
        return switch (type) {
            case "m-to-km"  -> new String[]{"м", "км"};
            case "km-to-m"  -> new String[]{"км", "м"};
            case "m-to-cm"  -> new String[]{"м", "см"};
            case "cm-to-m"  -> new String[]{"см", "м"};
            case "m-to-mm"  -> new String[]{"м", "мм"};
            case "kg-to-g"  -> new String[]{"кг", "г"};
            case "g-to-kg"  -> new String[]{"г", "кг"};
            case "kg-to-t"  -> new String[]{"кг", "т"};
            case "c-to-f"   -> new String[]{"C", "F"};
            case "f-to-c"   -> new String[]{"F", "C"};
            case "c-to-k"   -> new String[]{"C", "K"};
            case "k-to-c"   -> new String[]{"K", "C"};
            default -> new String[]{"?", "?"};
        };
    }
    //Проверка корректности ввода
    private void invalidInput(double value, String type) {
        if (!isTemperature(type) && value < 0) {
            throw new IllegalArgumentException("Значение не может быть отрицательным");
        }
        if (type.equals("k-to-c") && value < 0) {
            throw new IllegalArgumentException("Температура в Кельвинах не может быть отрицательной");
        }
        if ((type.equals("c-to-f") || type.equals("c-to-k")) && value < -273.15) {
            throw new IllegalArgumentException("Температура ниже абсолютного нуля (-273.15 C)");
        }
        if (type.equals("f-to-c") && value < -459.67) {
            throw new IllegalArgumentException("Температура ниже абсолютного нуля (-459.67 F)");
        }
    }
    //Проверка, не относится ли тип конвертации к температуе
    private boolean isTemperature(String type) {
        return type.startsWith("c-to-") || type.startsWith("f-to-") || type.startsWith("k-to-");
    }

    private String formatResult(double input, double output, String type) {
        String[] u = getUnits(type);
        return fmt(input) + " " + u[0] + " = " + fmt(output) + " " + u[1];
    }

    private String fmt(double v) {
        //Проверка на дробное число и находится ли в пределах диопазона double
        if (v == Math.floor(v) && Math.abs(v) < 1e15) {
            return String.valueOf((long) v);
        }
        return String.format("%.6g", v);
    }
}