package fpl.sd.backend.dto.response.report;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.sql.Time;
import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DailyTotalDTO {
    private LocalDate orderDate;
    private Double dailyTotal;
}
