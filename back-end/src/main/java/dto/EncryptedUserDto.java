package dto;
//import com.password4j.HashBuilder;
//import com.password4j.Password;
import org.bson.Document;

public class EncryptedUserDto extends UserDto{

    private double balance;

    public EncryptedUserDto() {}

    public EncryptedUserDto(String username, String email, String password, double balance) {
        super(username, password, email);
        this.balance = balance;
    }

    public EncryptedUserDto(PlaintextUserDto userDto) {
        super(userDto.getUsername(), userDto.getEmail());
        this.balance = 420.69;
        System.out.println("Password:" + userDto.getPassword());
//        HashBuilder hash = Password.hash(userDto.getPassword());
//        String password = hash.withBCrypt().getResult();
        //String password = Password.hash(userDto.getPassword()).addRandomSalt(15).withBCrypt().getResult();
        //System.out.println(password);
        this.setPassword(userDto.getPassword());
    }

    public Document toDocument() {
        return new Document("username", this.getUsername())
                .append("email", this.getEmail())
                .append("password", this.getPassword())
                .append("balance", balance);
    }

    public static EncryptedUserDto fromDocument(Document document) {
        var user = new EncryptedUserDto(document.getString("username"),
                document.getString("email"),
                document.getString("password"), document.getDouble("balance"));
        user.setUserId(document.getObjectId("_id").toHexString());
        return user;
    }

    public static EncryptedUserDto toDto(Document document) {
        return EncryptedUserDto.fromDocument((document));
    }

    public double getBalance() {
        return balance;
    }

    public EncryptedUserDto setBalance(double balance) {
        this.balance = balance;
        return this;
    }
}
