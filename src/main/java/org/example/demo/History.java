package org.example.demo;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
@SessionScope
public class History {

    private static final int MAX_SIZE = 20;
    private final List<String> entries = new ArrayList<>();

    public void add(String result) {
        if (entries.size() >= MAX_SIZE) {
            entries.remove(0);
        }
        entries.add(result);
    }

    public List<String> getAll() {
        List<String> reversed = new ArrayList<>(entries);
        Collections.reverse(reversed);
        return reversed;
    }

    public void clear() {
        entries.clear();
    }

    public int size() {
        return entries.size();
    }
}
