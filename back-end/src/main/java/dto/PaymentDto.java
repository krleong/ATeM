package dto;

import dao.PaymentDao;
import org.bson.Document;
import org.bson.types.ObjectId;

public class PaymentDto {
    private String usernameA;
    private String usernameB;
    private String userIdA;
    private String userIdB;
    private String transactionId;
    private String transactionType;
    private double amount;
    private String description;
    private String timeStamp;
    private boolean isPublic;

    public PaymentDto() {
    }

    public PaymentDto(String usernameA, String usernameB, String userIdA, String userIdB, String transactionType, double amount, String description, String timeStamp, boolean isPublic) {
        this.usernameA = usernameA;
        this.usernameB = usernameB;
        this.userIdA = userIdA;
        this.userIdB = userIdB;
        this.transactionType = transactionType;
        this.amount = amount;
        this.description = description;
        this.timeStamp = timeStamp;
        this.isPublic = isPublic;
    }

    public String getUsernameA() {
        return usernameA;
    }

    public PaymentDto setUsernameA(String usernameA) {
        this.usernameA = usernameA;
        return this;
    }

    public String getUsernameB() {
        return usernameB;
    }

    public PaymentDto setUsernameB(String usernameB) {
        this.usernameB = usernameB;
        return this;
    }

    public String getUserIdA() {
        return userIdA;
    }

    public PaymentDto setUserIdA(String userIdA) {
        this.userIdA = userIdA;
        return this;
    }

    public String getUserIdB() {
        return userIdB;
    }

    public PaymentDto setUserIdB(String userIdB) {
        this.userIdB = userIdB;
        return this;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public PaymentDto setTransactionId(String transactionId) {
        this.transactionId = transactionId;
        return this;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public PaymentDto setTransactionType(String transactionType) {
        this.transactionType = transactionType;
        return this;
    }

    public double getAmount() {
        return amount;
    }

    public PaymentDto setAmount(double amount) {
        this.amount = amount;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public PaymentDto setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public PaymentDto setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
        return this;
    }

    public boolean getIsPublic() {
        return isPublic;
    }

    public PaymentDto setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
        return this;
    }

    public Document toDocument() {
        return new Document("usernameA", usernameA)
                .append("usernameB", usernameB)
                .append("userA_id", new ObjectId(userIdA))
                .append("userB_id", new ObjectId(userIdB))
                .append("transactionType", transactionType)
                .append("amount", amount)
                .append("description", description)
                .append("timeStamp", timeStamp)
                .append("isPublic", isPublic);
    }

    public static PaymentDto fromDocument(Document document) {
        var payment = new PaymentDto(document.getString("usernameA"),
                document.getString("usernameB"),
                document.getObjectId("userA_id").toHexString(),
                document.getObjectId("userB_id").toHexString(),
                document.getString("transactionType"),
                document.getDouble("amount"),
                document.getString("description"),
                document.getString("timeStamp"),
                document.getBoolean("isPublic"));
        payment.setTransactionId(document.getObjectId("_id").toHexString());

        return payment;
    }

    public static PaymentDto toDto (Document document) {
        return PaymentDto.fromDocument((document));
    }

}
