package com.javads.visualizer.model;

public class OperationResponse {
    private Object data;
    private String operation;
    private String timeComplexity;
    private String description;
    private Object result;
    private String error;

    public OperationResponse() {}

    public static OperationResponseBuilder builder() {
        return new OperationResponseBuilder();
    }

    public static class OperationResponseBuilder {
        private final OperationResponse response;

        public OperationResponseBuilder() {
            response = new OperationResponse();
        }

        public OperationResponseBuilder data(Object data) {
            response.data = data;
            return this;
        }

        public OperationResponseBuilder operation(String operation) {
            response.operation = operation;
            return this;
        }

        public OperationResponseBuilder timeComplexity(String timeComplexity) {
            response.timeComplexity = timeComplexity;
            return this;
        }

        public OperationResponseBuilder description(String description) {
            response.description = description;
            return this;
        }

        public OperationResponseBuilder result(Object result) {
            response.result = result;
            return this;
        }

        public OperationResponseBuilder error(String error) {
            response.error = error;
            return this;
        }

        public OperationResponse build() {
            return response;
        }
    }

    // Getters and setters
    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }
    
    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }
    
    public String getTimeComplexity() { return timeComplexity; }
    public void setTimeComplexity(String timeComplexity) { this.timeComplexity = timeComplexity; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Object getResult() { return result; }
    public void setResult(Object result) { this.result = result; }
    
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}
