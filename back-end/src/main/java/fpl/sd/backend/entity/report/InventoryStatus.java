package fpl.sd.backend.entity.report;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Immutable;

@Entity
@Table(name = "inventory_status")
@Immutable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InventoryStatus {
    @Id
    String sku;
    String shoeName;
    String category;
    String gender;
    String brandName;
    String sizeNumber;
    Integer currentStock;
    String stockStatus;
}
