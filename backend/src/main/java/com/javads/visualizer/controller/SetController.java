package com.javads.visualizer.controller;

import org.springframework.web.bind.annotation.*;
import com.javads.visualizer.model.OperationResponse;
import java.util.*;

@RestController
@RequestMapping("/api/set")
@CrossOrigin(origins = "http://localhost:5173")
public class SetController {
    private Set<Integer> set = new HashSet<>();

    @GetMapping
    public OperationResponse getSet() {
        return OperationResponse.builder()
                .data(new ArrayList<>(set))
                .operation("View")
                .timeComplexity("O(1)")
                .description("O(1) because we're just returning the reference to the set, no processing needed")
                .build();
    }

    @PostMapping("/add")
    public OperationResponse add(@RequestParam int value) {
        boolean added = set.add(value);
        return OperationResponse.builder()
                .data(new ArrayList<>(set))
                .operation("Add")
                .timeComplexity("O(1)")
                .description(added ? 
                    "O(1) because hash-based insertion directly computes the bucket location, no traversal needed" : 
                    "O(1) because hash-based lookup quickly determines if the element exists")
                .build();
    }

    @DeleteMapping("/{value}")
    public OperationResponse remove(@PathVariable int value) {
        boolean removed = set.remove(value);
        if (!removed) {
            return OperationResponse.builder()
                    .error("Value not found in set")
                    .build();
        }

        return OperationResponse.builder()
                .data(new ArrayList<>(set))
                .operation("Remove")
                .timeComplexity("O(1)")
                .description("O(1) because hash-based removal directly finds the bucket using element's hash")
                .build();
    }

    @GetMapping("/contains/{value}")
    public OperationResponse contains(@PathVariable int value) {
        return OperationResponse.builder()
                .data(new ArrayList<>(set))
                .result(set.contains(value))
                .operation("Contains")
                .timeComplexity("O(1)")
                .description("O(1) because hash-based lookup directly computes the bucket location from the element's hash")
                .build();
    }

    @PostMapping("/reset")
    public OperationResponse reset() {
        set.clear();
        return OperationResponse.builder()
                .data(new ArrayList<>(set))
                .operation("Reset")
                .timeComplexity("O(1)")
                .description("O(1) because we're just resetting the internal array of buckets, no traversal needed")
                .build();
    }
}
