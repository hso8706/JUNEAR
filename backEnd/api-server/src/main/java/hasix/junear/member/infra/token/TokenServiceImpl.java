package hasix.junear.member.infra.token;

import hasix.junear.member.application.TokenService;
import hasix.junear.member.domain.Member;
import hasix.junear.member.domain.Token;
import hasix.junear.member.infra.jwt.JwtProvider;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class TokenServiceImpl implements TokenService {

    private final JwtProvider jwtProvider;
    private final ValueOperations<String, String> valueOperations;
    private static final String REDIS_REFRESH_PREFIX = "REFRESH_USER_";


    public TokenServiceImpl(JwtProvider jwtProvider,
            RedisTemplate<String, String> redisStringTemplate) {
        this.jwtProvider = jwtProvider;
        this.valueOperations = redisStringTemplate.opsForValue();
    }

    @Override
    public Token createAccessToken(Member member) {
        String accessToken = jwtProvider.createAccessToken(member);
        return Token.of(accessToken);
    }

    @Override
    public Token createRefreshToken() {
        String refreshToken = jwtProvider.createRefreshToken();
        return Token.of(refreshToken);
    }

    @Override
    public void saveRefreshToken(Token refreshToken, Long memberId) {
        String refreshKey = getRefreshKey(memberId);
        valueOperations.set(refreshKey, refreshToken.getToken());
    }

    @Override
    public void deleteRefreshToken(Long memberId) {
        valueOperations.getAndDelete(getRefreshKey(memberId));
    }


    @Override
    public Optional<Token> getRefreshTokenFromMember(Member member) {
        String token = valueOperations.get(getRefreshKey(member.getId()));
        return Optional.of(Token.of(token));
    }

    private String getRefreshKey(Long memberId) {
        return REDIS_REFRESH_PREFIX + memberId.toString();
    }
}
