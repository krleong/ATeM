package dao;

import com.mongodb.client.MongoCollection;
//import dto.BasePaymentDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import dto.EncryptedUserDto;
import dto.PaymentDto;
import org.bson.Document;
import org.bson.types.ObjectId;

public class PaymentDao {
    private static PaymentDao instance;
    public MongoCollection<Document> paymentsCollection;

    private PaymentDao(MongoCollection<Document> paymentsCollection) {
        this.paymentsCollection = paymentsCollection;
    }

    public static PaymentDao getInstance() {
        if (instance == null) {
            instance = new PaymentDao(MongoConnection.getCollection("Payments"));
        }
        return instance;
    }

    public static PaymentDao getInstance(MongoCollection<Document> collection) {
        instance = new PaymentDao(collection);
        return instance;
    }

    public void put(PaymentDto paymentDto) {
        paymentsCollection.insertOne(paymentDto.toDocument());
    }

    // public transactions - feed
    public List<PaymentDto> getPublicTransactions() {
        return paymentsCollection.find(new Document("isPublic", true))
                .into(new ArrayList<>()).stream()
                .map(PaymentDto::toDto)
                .collect(Collectors.toList());
    }

    // all user transactions - dashboard
    public List<PaymentDto> getAllUserTransactions(String usernameA) {
        System.out.println(usernameA);
        return paymentsCollection.find(new Document("usernameA", usernameA))
                .into(new ArrayList<>()).stream()
                .map(PaymentDto::toDto)
                .collect(Collectors.toList());
    }

    public List<PaymentDto> getAll() {
        return paymentsCollection.find().into(new ArrayList<>()).stream()
                .map(PaymentDto::toDto)
                .collect(Collectors.toList());
    }
}


