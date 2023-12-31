package hasix.junear.portfolio.infra.repository;

import hasix.junear.portfolio.domain.Portfolio;
import hasix.junear.portfolio.domain.PortfolioRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PortfolioRepositoryImpl implements PortfolioRepository {

    private final JpaPortfolioRepository jpaPortfolioRepository;

    @Override
    public Optional<Portfolio> findById(Long id) {
        return jpaPortfolioRepository.findById(id);
    }

    @Override
    public Portfolio save (Portfolio portfolio) {
        return jpaPortfolioRepository.save(portfolio);
    }

    @Override
    public Optional<Portfolio> findByMemberIdAndCorporationId(Long memberId,
            Long corporationId) {
        return jpaPortfolioRepository.findByMemberIdAndCorporationId(memberId, corporationId);
    }

    @Override
    public void deleteById(Long portfolioId) {
        jpaPortfolioRepository.deleteById(portfolioId);
    }

    @Override
    public List<Portfolio> findAllByMemberId(Long memberId) {
        return jpaPortfolioRepository.findAllByMemberId(memberId);
    }
}
