package response;

public class LoginResponseDto {
    private Boolean isSuccess;
    private String message;
    private String id;
    private String username;

    public LoginResponseDto(Boolean isSuccess, String message, String id, String username) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.id = id;
        this.username = username;
    }

    public Boolean getSuccess() {
        return isSuccess;
    }

    public LoginResponseDto setSuccess(Boolean success) {
        isSuccess = success;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public LoginResponseDto setMessage(String message) {
        this.message = message;
        return this;
    }

    public String getId() {
        return id;
    }

    public LoginResponseDto setId(String id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public LoginResponseDto setUsername(String username) {
        this.username = username;
        return this;
    }
}
