package dto;

import org.bson.Document;

public class PlaintextUserDto extends UserDto{

    public PlaintextUserDto(String username, String password, String email) {
        super(username, password, email);
    }

    @Override
    public Document toDocument() {
        return new Document("username",  this.getUsername())
                .append("password", this.getPassword());
    }
}
