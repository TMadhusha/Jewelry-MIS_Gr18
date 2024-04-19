package jwl.mis.jewelry_ms.models;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminModel {

    private String username;
    private String password;
    private String conformPassword;
    private String email;
}
