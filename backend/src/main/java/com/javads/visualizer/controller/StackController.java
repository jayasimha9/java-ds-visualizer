package com.javads.visualizer.controller;

import org.springframework.web.bind.annotation.*;
import com.javads.visualizer.model.OperationResponse;
import java.util.*;

@RestController
@RequestMapping("/api/stack")
@CrossOrigin(origins = "http://localhost:5173")
public class StackController {
    private final Deque<Integer> stack = new ArrayDeque<>();

    @GetMapping
    public OperationResponse getStack() {
        return OperationResponse.builder()
                .data(new ArrayList<>(stack))
                .operation("View")
                .timeComplexity("O(1)")
                .description("O(1) because we only need to look at the top pointer of the stack, no traversal needed")
                .build();
    }

    @PostMapping("/push")
    public OperationResponse push(@RequestParam int value) {
        stack.push(value);
        return OperationResponse.builder()
                .data(new ArrayList<>(stack))
                .operation("Push")
                .timeComplexity("O(1)")
                .description("O(1) because we're simply adding to the top of the stack, no need to shift or traverse elements")
                .build();
    }

    @PostMapping("/pop")
    public OperationResponse pop() {
        if (stack.isEmpty()) {
            return OperationResponse.builder()
                    .error("Stack is empty")
                    .build();
        }

        int popped = stack.pop();
        return OperationResponse.builder()
                .data(new ArrayList<>(stack))
                .result(popped)
                .operation("Pop")
                .timeComplexity("O(1)")
                .description("O(1) because we're only removing from the top of the stack, no need to shift remaining elements")
                .build();
    }

    @GetMapping("/search/{value}")
    public OperationResponse search(@PathVariable int value) {
        List<Integer> stackList = new ArrayList<>(stack);
        int index = -1;
        for (int i = 0; i < stackList.size(); i++) {
            if (stackList.get(i) == value) {
                index = i;
                break;
            }
        }
        return OperationResponse.builder()
                .data(stackList)
                .result(index)
                .operation("Search")
                .timeComplexity("O(n)")
                .description("O(n) because we need to potentially check every element in the stack from top to bottom. This is not a standard stack operation and breaks the stack principle of only accessing the top element.")
                .build();
    }

    @PostMapping("/reset")
    public OperationResponse reset() {
        stack.clear();
        return OperationResponse.builder()
                .data(new ArrayList<>(stack))
                .operation("Reset")
                .timeComplexity("O(1)")
                .description("O(1) because we're just resetting the top pointer, no need to individually remove elements")
                .build();
    }
}
