package response;

public class BalanceResponseDto {
    private boolean isSuccess;
    private String message;
    private double balance;

    public BalanceResponseDto(boolean isSuccess, String message, double balance) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.balance = balance;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public BalanceResponseDto setSuccess(boolean success) {
        isSuccess = success;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public BalanceResponseDto setMessage(String message) {
        this.message = message;
        return this;
    }

    public double getBalance() {
        return balance;
    }

    public BalanceResponseDto setBalance(double balance) {
        this.balance = balance;
        return this;
    }
}
