package response;

import java.util.HashMap;
import java.util.Map;

public class ResponseBuilder {

  private Map<String,String> headers = new HashMap<>();
  private String status;
  private String version;
  private String body;

  public ResponseBuilder setHeaders(Map<String, String> headers) {
    this.headers = headers;
    return this;
  }

  public ResponseBuilder setStatus(String status) {
    this.status = status;
    return this;
  }

  public ResponseBuilder setVersion(String version) {
    this.version = version;
    return this;
  }

  public ResponseBuilder setBody(String body) {
    this.body = body;
    return this;
  }

  public CustomHttpResponse build(){
    return new CustomHttpResponse(headers, status, version, body);
  }
}
