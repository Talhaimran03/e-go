package ego.model;

import java.util.ArrayList;
import java.util.List;

public class Response<T> {
    private boolean success;
    private T data;
    private List<String> errors;

    public Response(boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    public Response(boolean success, List<String> errors) {
        this.success = success;
        this.errors = errors;
    }
    
    public Response(boolean success) {
        this.success = success;
    }

    // Getters and setters

    public boolean getSuccess() { 
        return success;
    }

    public void  setSuccess(boolean success) {  
        this.success = success;
    }

    public T getData() { 
        return data;
    }

    public void setData(T data) {  
        this.data = data;
    }

    public  List<String> getErrors() {  
        return errors;
    }

    public void setErrors(String error) {  
        if (this.errors == null) {
            this.errors = new ArrayList<>();
        }
        this.errors.add(error);
    }
    
}