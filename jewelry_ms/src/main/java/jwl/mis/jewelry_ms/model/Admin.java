package jwl.mis.jewelry_ms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private String username;
    @Column(length = 60)
    private String password;
    private String role;
    private String email;
    private boolean enable=false;
}
