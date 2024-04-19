package jwl.mis.jewelry_ms.login.Event;

import jwl.mis.jewelry_ms.model.Admin;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {

    private Admin admin;
    private String applicationUrl;
    public RegistrationCompleteEvent(Admin admin,String applicationUrl) {
        super(admin);
        this.admin= admin;
        this.applicationUrl=applicationUrl;
    }
}
