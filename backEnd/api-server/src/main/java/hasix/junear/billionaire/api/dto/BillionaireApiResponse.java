package hasix.junear.billionaire.api.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import hasix.junear.billionaire.application.dto.TodayLifeQuotes;
import lombok.Builder;
import lombok.Getter;

@Getter
@JsonNaming(SnakeCaseStrategy.class)
public class BillionaireApiResponse {
    private String name;
    private String imageUrl;
    private String phrase;

    @Builder
    public BillionaireApiResponse(String name, String imageUrl, String phrase) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.phrase = phrase;
    }

    public static BillionaireApiResponse from(TodayLifeQuotes todayLifeQuotes) {
        return BillionaireApiResponse.builder()
                .name(todayLifeQuotes.getName())
                .imageUrl(todayLifeQuotes.getImageUrl())
                .phrase(todayLifeQuotes.getPhrase())
                .build();
    }
}
