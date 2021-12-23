package response;

public class SignUpResponseDto {
    private Boolean isSuccess;
    private String message;

    public SignUpResponseDto(Boolean isSuccess, String message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    public Boolean getSuccess() {
        return isSuccess;
    }

    public SignUpResponseDto setSuccess(Boolean success) {
        isSuccess = success;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public SignUpResponseDto setMessage(String message) {
        this.message = message;
        return this;
    }
}
