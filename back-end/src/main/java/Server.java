import com.google.gson.TypeAdapter;
import com.google.gson.TypeAdapterFactory;
import dao.PaymentDao;
import dao.UserDao;
import dto.EncryptedUserDto;
import com.google.gson.Gson;
import dto.PaymentDto;
import dto.PlaintextUserDto;
import dto.UserDto;
import org.bson.Document;
import org.bson.types.ObjectId;
import response.BalanceResponseDto;
import response.GetPaymentResponseDto;
import response.LoginResponseDto;
import response.TransactionResponseDto;

import static spark.Spark.*;

import java.io.IOException;
import java.util.List;

public class Server {

    public class PaymentSizeDto {

        int size;

        public PaymentSizeDto(int size) {
            this.size = size;
        }

        public int getSize() {
            return size;
        }

        public PaymentSizeDto setSize(int size) {
            this.size = size;
            return this;
        }
    }

    public class UserTransactionDto {

        String username;

        public UserTransactionDto(String username) {
            this.username = username;
        }

        public String getUsername() {
            return username;
        }

        public UserTransactionDto setUsername(String username) {
            this.username = username;
            return this;
        }
    }

    private static Gson gson = new Gson();

    public static void main(String[] args) throws IOException {
        port(1234);
        System.out.println("Established port 1234");
//        ServerSocket ding;
//        Socket dong = null;

//        MongoClient mongoClient = new MongoClient("localhost", 27017);
//        System.out.println("Connected to database");
//
//        MongoDatabase db = mongoClient.getDatabase("TermProject");
//        MongoCollection<Document> usersCollection = db.getCollection("Users");


        post("/api/sign-up", (req, res) -> {
            String body = req.body();
            System.out.println(body);

            PlaintextUserDto newUser = gson.fromJson(body, PlaintextUserDto.class);
            UserDao userDao = UserDao.getInstance();

            EncryptedUserDto potentialUsername = userDao.getViaUsername(newUser.getUsername());
            EncryptedUserDto potentialEmail = userDao.getViaEmail(newUser.getEmail());

            if (potentialUsername != null && potentialEmail != null) {
                var response = new SignUpResponseDto(false, "Username and email already taken!");
                System.out.println("Username and email already exists!");
                return gson.toJson(response);
            } else if (potentialUsername != null && potentialEmail == null) {
                var response = new SignUpResponseDto(false, "Username already exists!");
                System.out.println("Username already exists!");
                return gson.toJson(response);
            } else if (potentialUsername == null && potentialEmail != null) {
                var response = new SignUpResponseDto(false, "Email already taken!");
                System.out.println("Email already exists!");
                return gson.toJson(response);
            } else {
                System.out.println("Create new user");
                userDao.put(new EncryptedUserDto(newUser));
                var response = new SignUpResponseDto(true, null);
                //newUser.setPassword(Password.hash(newUser.getPassword()).addSalt("15").withBCrypt().getResult());
                return gson.toJson(response);
            }
        });

        post("/api/log-in", (req, res) -> {
            String body = req.body();
            System.out.println(body);
            System.out.println("this happens");

            PlaintextUserDto loginAttempt = gson.fromJson(body, PlaintextUserDto.class);
            UserDao userDao = UserDao.getInstance();

            EncryptedUserDto potentialLoginUser = userDao.getViaUsername(loginAttempt.getUsername());

            if (potentialLoginUser == null) {
                var response = new LoginResponseDto(false, "User does not exist!", "", "");
                System.out.println("User does not exist!");
                return gson.toJson(response);
            } else {
                if (potentialLoginUser.getPassword().equals(loginAttempt.getPassword())) {
                    var response = new LoginResponseDto(true, "User is logged in!", potentialLoginUser.getUserId(), potentialLoginUser.getUsername());
                    System.out.println("User is logged in!");
                    return gson.toJson(response);
                } else {
                    var response = new LoginResponseDto(false, "Password is incorrect!", "", "");
                    System.out.println("Password is incorrect!");
                    return gson.toJson(response);
                }
            }
        });
        get("/hello", (req, res) -> "asd");

        get("/api/get-public-transactions", (req, res) -> {
            int size = Integer.parseInt(req.headers("Size"));
            System.out.println("Size:" + size);
            PaymentDao paymentDao = PaymentDao.getInstance();
            List<PaymentDto> listOfPublicTransactions = paymentDao.getPublicTransactions();

            if (listOfPublicTransactions.size() > 0) {
                System.out.println("List of public transactions present!");
                if (size == 0 || listOfPublicTransactions.size() <= size) {
                    var response = new GetPaymentResponseDto(true, "List of public transactions present!", listOfPublicTransactions);
                    return gson.toJson(response);
                } else if (size >= 0) {
                    List<PaymentDto> newSizedPaymentsList = listOfPublicTransactions.subList(listOfPublicTransactions.size() - size, listOfPublicTransactions.size());
                    var response = new GetPaymentResponseDto(true, "Returning requested amount of transactions.", newSizedPaymentsList);
                    return gson.toJson(response);
                } else {
                    var response = new GetPaymentResponseDto(false, "Invalid size. Cannot get payments", null);
                    return gson.toJson(response);
                }

            } else {
                System.out.println("There are no public transactions present. List is empty!");
                var response = new GetPaymentResponseDto(false, "There are no public transactions present. List is empty!", listOfPublicTransactions);
                return gson.toJson(response);
            }
        });

        get("/api/get-user-transactions", (req, res) -> {
            String username = req.headers("Username");
            System.out.println("Username:" + username);

            String body = req.body();
            System.out.println(body);

            //System.out.println(username);
            UserDao userDao = UserDao.getInstance();

            PaymentDao paymentDao = PaymentDao.getInstance();

            UserDto potentialUser = userDao.getViaUsername(username);

            if (potentialUser != null) {
                List<PaymentDto> listOfUserTransactions = paymentDao.getAllUserTransactions(username);
                if (listOfUserTransactions.size() > 0) {

                    System.out.println("List of user transactions present!");
                    var response = new GetPaymentResponseDto(true, "List of user transactions present!", listOfUserTransactions);
                    return gson.toJson(response);
                } else {
                    System.out.println("There are no user transactions present. List is empty!");
                    var response = new GetPaymentResponseDto(false, "There are no user transactions present. List is empty!", listOfUserTransactions);
                    return gson.toJson(response);
                }
            } else {
                System.out.println("Cannot find user!");
                var response = new GetPaymentResponseDto(false, "Cannot find user!");
                return gson.toJson(response);
            }
        });

        post("/api/send-transaction", (req, res) -> {
            String body = req.body();
            System.out.println(body);

            PaymentDto newUserTransaction = gson.fromJson(body, PaymentDto.class);
            PaymentDao paymentDao = PaymentDao.getInstance();

            UserDao userDao = UserDao.getInstance();

            EncryptedUserDto potentialUserA = userDao.getViaUsername(newUserTransaction.getUsernameA());
            EncryptedUserDto potentialUserB = userDao.getViaUsername(newUserTransaction.getUsernameB());
//            EncryptedUserDto userA = userDao.getViaUsername(newUserTransaction.getUsernameA());
//            EncryptedUserDto userB = userDao.getViaUsername(newUserTransaction.getUsernameA());

            if (potentialUserA != null && potentialUserB != null) {
//                var response = new TransactionResponseDto(true, "Both parties in transaction exist!");
//                System.out.println("Both parties in transaction exist!");
                newUserTransaction.setUserIdA(potentialUserA.getUserId());
                newUserTransaction.setUserIdB(potentialUserB.getUserId());

                //System.out.println("Initiate new transaction");
                //System.out.println(potentialUserA.getUsername() + potentialUserA.getBalance() + newUserTransaction.getAmount());
                if (newUserTransaction.getTransactionType().equals("Pay")) {
                    userDao.updateBal(potentialUserA, potentialUserA.getBalance() - newUserTransaction.getAmount());
                    userDao.updateBal(potentialUserB, potentialUserB.getBalance() + newUserTransaction.getAmount());
                    paymentDao.put(new PaymentDto(newUserTransaction.getUsernameA(), newUserTransaction.getUsernameB(), newUserTransaction.getUserIdA(), newUserTransaction.getUserIdB(), newUserTransaction.getTransactionType(), newUserTransaction.getAmount(), newUserTransaction.getDescription(), newUserTransaction.getTimeStamp(), newUserTransaction.getIsPublic()));
                    var response = new TransactionResponseDto(true, "Successfully paid to " + potentialUserA.getUsername());
                    return gson.toJson(response);
                } else if (newUserTransaction.getTransactionType().equals("Request")) {
                    userDao.updateBal(potentialUserA, potentialUserA.getBalance() + newUserTransaction.getAmount());
                    userDao.updateBal(potentialUserB, potentialUserB.getBalance() - newUserTransaction.getAmount());
                    paymentDao.put(new PaymentDto(newUserTransaction.getUsernameA(), newUserTransaction.getUsernameB(), newUserTransaction.getUserIdA(), newUserTransaction.getUserIdB(), newUserTransaction.getTransactionType(), newUserTransaction.getAmount(), newUserTransaction.getDescription(), newUserTransaction.getTimeStamp(), newUserTransaction.getIsPublic()));
                    var response = new TransactionResponseDto(true, "Successfully requested from " + potentialUserA.getUsername());
                    return gson.toJson(response);
                } else {
                    var response = new TransactionResponseDto(false, "Could not process transaction.");
                    return gson.toJson(response);
                }
                //userDao.usersCollection.updateOne(new Document("username", userA.getUsername()), new Document("balance", userA.getBalance()-newUserTransaction.getAmount()));
                //userDao.usersCollection.updateOne(new Document("username", userB.getUsername()), new Document("balance", userB.getBalance()+newUserTransaction.getAmount()));
                //paymentDao.put(new PaymentDto(newUserTransaction.getUsernameA(), newUserTransaction.getUsernameB(), newUserTransaction.getUserIdA(), newUserTransaction.getUserIdB(), newUserTransaction.getTransactionType(), newUserTransaction.getAmount(), newUserTransaction.getDescription(), newUserTransaction.getTimeStamp(), newUserTransaction.getIsPublic()));
            } else {
                var response = new TransactionResponseDto(false, "One or more users in transaction does not exist!");
                System.out.println("One or more users in transaction does not exist!");
                return gson.toJson(response);
            }

        });

        get("/api/get-user-balance", (req, res) -> {
            String username = req.headers("Username");
            System.out.println("Username:" + username);

            UserDao userDao = UserDao.getInstance();

            EncryptedUserDto potentialUser = userDao.getViaUsername(username);

            if (potentialUser != null) {
                System.out.println("User balance found!");
                var response = new BalanceResponseDto(true, "User balance found!", potentialUser.getBalance());
                return gson.toJson(response);
            } else {
                System.out.println("Cannot find user!");
                var response = new BalanceResponseDto(false, "Cannot find user!", 0);
                return gson.toJson(response);
            }
        });
    }
}
