package dao;

import com.mongodb.client.MongoCollection;
import dto.EncryptedUserDto;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UserDao {
    private static UserDao instance;
    public MongoCollection<Document> usersCollection;

    private UserDao(MongoCollection<Document> usersCollection) {
        this.usersCollection = usersCollection;
    }

    public static UserDao getInstance() {
        if (instance == null) {
            instance = new UserDao(MongoConnection.getCollection("Users"));
        }
        return instance;
    }

    public static UserDao getInstance(MongoCollection<Document> collection) {
        instance = new UserDao(collection);
        return instance;
    }

    public void put(EncryptedUserDto encryptedUserDto) {
        usersCollection.insertOne(encryptedUserDto.toDocument());
    }

    public EncryptedUserDto getViaUsername(String username) {
        var document = usersCollection.find(new Document("username", username)).first();
        if (document != null) {
            return EncryptedUserDto.toDto(document);
        } else {
            return null;
        }
    }

    public EncryptedUserDto getViaEmail(String email) {
        var document = usersCollection.find(new Document("email", email)).first();
        if (document != null) {
            return EncryptedUserDto.toDto(document);
        } else {
            return null;
        }
    }

    public EncryptedUserDto getViaId(String id) {
        var document= usersCollection.find(new Document("_id", new ObjectId(id))).first();
        if (document != null) {
            return EncryptedUserDto.toDto(document);
        } else {
            return null;
        }
    }

    public MongoCollection<Document> getUsersCollection() {
        return usersCollection;
    }

    public List<EncryptedUserDto> getAll() {
        return usersCollection.find().into(new ArrayList<>()).stream()
                .map(EncryptedUserDto::toDto)
                .collect(Collectors.toList());
    }

    public void updateBal(EncryptedUserDto user, double newBalance){
        user.setBalance(newBalance);
        usersCollection.replaceOne(new Document("username", user.getUsername()), user.toDocument());
    }
}
