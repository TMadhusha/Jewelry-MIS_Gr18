package jwl.mis.jewelry_ms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;

@Entity
public class Admin {

    @Id
    private Long empId;
    private String username;
    private String password;
    private String conformPassword;
}
