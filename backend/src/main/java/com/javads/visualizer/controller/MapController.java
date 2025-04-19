package com.javads.visualizer.controller;

import org.springframework.web.bind.annotation.*;
import com.javads.visualizer.model.OperationResponse;
import java.util.*;

@RestController
@RequestMapping("/api/map")
@CrossOrigin(origins = "http://localhost:5173")
public class MapController {
    private Map<String, Integer> map = new HashMap<>();

    @GetMapping
    public OperationResponse getMap() {
        return OperationResponse.builder()
                .data(map)
                .operation("View")
                .timeComplexity("O(1)")
                .description("O(1) because we're just returning the reference to the map, no processing needed")
                .build();
    }

    @PostMapping("/put")
    public OperationResponse put(@RequestParam String key, @RequestParam int value) {
        boolean isUpdate = map.containsKey(key);
        map.put(key, value);
        return OperationResponse.builder()
                .data(map)
                .operation(isUpdate ? "Update" : "Put")
                .timeComplexity("O(1)")
                .description(isUpdate ? 
                    "O(1) because hash-based update directly finds the bucket using the key's hash" : 
                    "O(1) because hash-based insertion directly computes the bucket location, no traversal needed")
                .build();
    }

    @DeleteMapping("/{key}")
    public OperationResponse remove(@PathVariable String key) {
        if (!map.containsKey(key)) {
            return OperationResponse.builder()
                    .error("Key not found")
                    .build();
        }

        int removed = map.remove(key);
        return OperationResponse.builder()
                .data(map)
                .result(removed)
                .operation("Remove")
                .timeComplexity("O(1)")
                .description("O(1) because hash-based removal directly finds the bucket using the key's hash")
                .build();
    }

    @GetMapping("/get/{key}")
    public OperationResponse get(@PathVariable String key) {
        if (!map.containsKey(key)) {
            return OperationResponse.builder()
                    .error("Key not found")
                    .build();
        }

        return OperationResponse.builder()
                .data(map)
                .result(map.get(key))
                .operation("Get")
                .timeComplexity("O(1)")
                .description("O(1) because hash-based lookup directly computes the bucket location from the key")
                .build();
    }

    @GetMapping("/contains/{key}")
    public OperationResponse containsKey(@PathVariable String key) {
        return OperationResponse.builder()
                .data(map)
                .result(map.containsKey(key))
                .operation("Contains Key")
                .timeComplexity("O(1)")
                .description("O(1) because hash-based lookup directly finds the bucket using the key's hash")
                .build();
    }

    @PostMapping("/reset")
    public OperationResponse reset() {
        map.clear();
        return OperationResponse.builder()
                .data(map)
                .operation("Reset")
                .timeComplexity("O(1)")
                .description("O(1) because we're just resetting the internal array of buckets, no traversal needed")
                .build();
    }
}
