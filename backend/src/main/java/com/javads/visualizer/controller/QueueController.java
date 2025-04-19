package com.javads.visualizer.controller;

import org.springframework.web.bind.annotation.*;
import com.javads.visualizer.model.OperationResponse;
import java.util.*;

@RestController
@RequestMapping("/api/queue")
@CrossOrigin(origins = "http://localhost:5173")
public class QueueController {
    private Queue<Integer> queue = new LinkedList<>();

    @GetMapping
    public OperationResponse getQueue() {
        return OperationResponse.builder()
                .data(new ArrayList<>(queue))
                .operation("View")
                .timeComplexity("O(1)")
                .description("Viewing the queue")
                .build();
    }

    @PostMapping("/enqueue")
    public OperationResponse enqueue(@RequestParam int value) {
        queue.offer(value);
        return OperationResponse.builder()
                .data(new ArrayList<>(queue))
                .operation("Enqueue")
                .timeComplexity("O(1)")
                .description("Adding element to end of queue")
                .build();
    }

    @PostMapping("/dequeue")
    public OperationResponse dequeue() {
        if (queue.isEmpty()) {
            return OperationResponse.builder()
                    .error("Queue is empty")
                    .build();
        }

        int removed = queue.poll();
        return OperationResponse.builder()
                .data(new ArrayList<>(queue))
                .result(removed)
                .operation("Dequeue")
                .timeComplexity("O(1)")
                .description("Removing element from front of queue")
                .build();
    }

    @GetMapping("/peek")
    public OperationResponse peek() {
        if (queue.isEmpty()) {
            return OperationResponse.builder()
                    .error("Queue is empty")
                    .build();
        }

        return OperationResponse.builder()
                .data(new ArrayList<>(queue))
                .result(queue.peek())
                .operation("Peek")
                .timeComplexity("O(1)")
                .description("Viewing front element without removal")
                .build();
    }

    @PostMapping("/reset")
    public OperationResponse reset() {
        queue.clear();
        return OperationResponse.builder()
                .data(new ArrayList<>(queue))
                .operation("Reset")
                .timeComplexity("O(1)")
                .description("Clearing queue")
                .build();
    }
}
