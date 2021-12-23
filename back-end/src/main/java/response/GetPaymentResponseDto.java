package response;

import dto.PaymentDto;
import java.util.List;

public class GetPaymentResponseDto {
    private Boolean isSuccess;
    private String message;
    private List<PaymentDto> listOfPayments;

    public GetPaymentResponseDto(Boolean isSuccess, String message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    public GetPaymentResponseDto(Boolean isSuccess, String message, List<PaymentDto> listOfPayments) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.listOfPayments = listOfPayments;
    }

    public Boolean getSuccess() {
        return isSuccess;
    }

    public GetPaymentResponseDto setSuccess(Boolean success) {
        isSuccess = success;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public GetPaymentResponseDto setMessage(String message) {
        this.message = message;
        return this;
    }

    public List<PaymentDto> getListOfPayments() {
        return listOfPayments;
    }

    public GetPaymentResponseDto setListOfPayments(List<PaymentDto> listOfPayments) {
        this.listOfPayments = listOfPayments;
        return this;
    }
}
