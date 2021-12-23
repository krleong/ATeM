package dto;

import org.bson.Document;

public abstract class UserDto {
    private String username;
    private String email;
    private String password;
    private String userId;

    public UserDto() {}

    public UserDto(String username) {
        this.username = username;
    }

    public UserDto(String username, String email) {
        this.username= username;
        this.email= email;
    }

    public UserDto(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public UserDto setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getUserId() {
        return userId;
    }

    public UserDto setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    public abstract Document toDocument();

}

