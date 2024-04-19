package jwl.mis.jewelry_ms.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class VerificationToken {

    private static final int EXPERYTIME=10;//10 minutes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String token;
    private Date experyTime;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Id", nullable = false, foreignKey = @ForeignKey(name = "FK_ADMIN_VERYFY_TOKEN"))
    private Admin admin;

    public VerificationToken(Admin admin,String token){
        super();
        this.token=token;
        this.admin=admin;
        this.experyTime=calculateexperyDate(EXPERYTIME);
    }

    public VerificationToken(String token){
        super();
        this.token=token;
        this.experyTime=calculateexperyDate(EXPERYTIME);
    }

    private Date calculateexperyDate(int experyTime) {
        Calendar calendar=Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(calendar.MINUTE,experyTime);
        return new Date(calendar.getTime().getTime());
    }
}
