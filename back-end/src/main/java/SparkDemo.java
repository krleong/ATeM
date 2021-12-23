import com.google.gson.Gson;
import static spark.Spark.*;

import java.util.ArrayList;
import java.util.List;

class UserDto{
  public String username;
  public String email;
  public String password;
  public String confirmPassword;
}

class SignUpResponseDto{
  public Boolean isSuccess;
  public  String message;

  public SignUpResponseDto(Boolean isSuccess, String message){
    this.isSuccess = isSuccess;
    this.message = message;
  }
}

public class SparkDemo {

  private static Gson gson = new Gson();
  private static List<UserDto> users = new ArrayList<>();

  public static void main(String[] args) {
    port(1234);

    post("/api/sign-up", (req, res) -> {
      String body = req.body();
      System.out.println(body);
      // decode to a java dto
      UserDto userDto = gson.fromJson(body, UserDto.class);

      boolean isUsernameTaken = users.stream()
              .anyMatch(u -> u.username.equals(userDto.username));
      boolean isEmailUsed = users.stream()
              .anyMatch(u -> u.email.equals(userDto.email));
      boolean passMatch = (userDto.password.equals(userDto.confirmPassword));

      if(isUsernameTaken){
        var signupRes = new SignUpResponseDto(false, "Username is taken");
        return gson.toJson(signupRes);
      }
      else if(isEmailUsed){
        var signupRes = new SignUpResponseDto(false, "Email is in use");
        return gson.toJson(signupRes);
      }
      else if(!passMatch){
        var signupRes = new SignUpResponseDto(false, "Password and Confirm Password must match");
        return gson.toJson(signupRes);
      }

      users.add(userDto);
      System.out.println("Total Users " + users.size());
      var signupRes = new SignUpResponseDto(true, null);

      return gson.toJson(signupRes); //temporary
    });

    get("/hello", (req, res) -> "asd");
  }
}
