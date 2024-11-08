package fpl.sd.backend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Collections;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PageResponse<T> {
    int totalPages;
    int pageSize;
    long totalElements;
    int currentPage;

    @Builder.Default
    List<T> data = Collections.emptyList();

}
