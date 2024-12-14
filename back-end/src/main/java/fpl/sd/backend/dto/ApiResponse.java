package fpl.sd.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    boolean flag;
    @Builder.Default
    int code = 200;
    String message;
    Map<String, Object> additionalData;
    T result;
    public static class ApiResponseBuilder<T> {
        public ApiResponseBuilder<T> additionalData(Map<String, Object> additionalData) {
            this.additionalData = additionalData;
            return this;
        }
    }
}
