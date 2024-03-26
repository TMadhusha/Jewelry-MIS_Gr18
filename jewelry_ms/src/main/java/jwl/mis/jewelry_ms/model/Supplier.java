package jwl.mis.jewelry_ms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {

    @Id
    @GeneratedValue
    private Long sup_Id;
    private String supName;
    private String address;
    private String itemID;
    private String quantity;
    private String phoneNumber;
    private String email;

}


