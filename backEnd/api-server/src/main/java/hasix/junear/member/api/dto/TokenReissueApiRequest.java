package hasix.junear.member.api.dto;


import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonNaming(SnakeCaseStrategy.class)
public class TokenReissueApiRequest {

    @NotBlank
    private String refreshToken;

}
