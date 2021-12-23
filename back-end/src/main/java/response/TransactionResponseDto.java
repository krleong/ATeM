package response;

public class TransactionResponseDto {
    private Boolean isSuccess;
    private String message;

    public TransactionResponseDto(Boolean isSuccess, String message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    public Boolean getSuccess() {
        return isSuccess;
    }

    public TransactionResponseDto setSuccess(Boolean success) {
        isSuccess = success;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public TransactionResponseDto setMessage(String message) {
        this.message = message;
        return this;
    }
}
