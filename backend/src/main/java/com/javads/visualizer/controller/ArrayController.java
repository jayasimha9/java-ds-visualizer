package com.javads.visualizer.controller;

import org.springframework.web.bind.annotation.*;
import com.javads.visualizer.model.OperationResponse;
import java.util.*;

@RestController
@RequestMapping("/api/array")
@CrossOrigin(origins = "http://localhost:5173")
public class ArrayController {
    private List<Integer> array = new ArrayList<>();

    @GetMapping
    public OperationResponse getArray() {
        return OperationResponse.builder()
                .data(array)
                .operation("Access")
                .timeComplexity("O(1)")
                .description("Arrays provide constant-time access to elements using index")
                .build();
    }

    @PostMapping("/insert")
    public OperationResponse insert(@RequestParam int value, @RequestParam(required = false) Integer index) {
        if (index != null && (index < 0 || index > array.size())) {
            return OperationResponse.builder()
                    .error("Invalid index")
                    .build();
        }

        if (index != null) {
            array.add(index, value);
        } else {
            array.add(value);
        }

        return OperationResponse.builder()
                .data(array)
                .operation("Insert")
                .timeComplexity(index != null ? "O(n)" : "O(1)")
                .description(index != null ? 
                    "O(n) because we need to shift all elements after the insertion point to make space" : 
                    "O(1) because we're adding to the end of the array, no need to shift any elements")
                .build();
    }

    @DeleteMapping("/{index}")
    public OperationResponse delete(@PathVariable int index) {
        if (index < 0 || index >= array.size()) {
            return OperationResponse.builder()
                    .error("Invalid index")
                    .build();
        }

        int removed = array.remove(index);
        return OperationResponse.builder()
                .data(array)
                .result(removed)
                .operation("Delete")
                .timeComplexity("O(n)")
                .description("O(n) because we need to shift all elements after the deletion point to fill the gap")
                .build();
    }

    @GetMapping("/search/{value}")
    public OperationResponse search(@PathVariable int value) {
        int index = array.indexOf(value);
        return OperationResponse.builder()
                .data(array)
                .result(index)
                .operation("Search")
                .timeComplexity("O(n)")
                .description("O(n) because in the worst case we need to traverse the entire array")
                .build();
    }

    @PostMapping("/reset")
    public OperationResponse reset() {
        array.clear();
        return OperationResponse.builder()
                .data(array)
                .operation("Reset")
                .timeComplexity("O(1)")
                .description("O(1) because we're just clearing the reference to the array, no processing needed")
                .build();
    }
}
