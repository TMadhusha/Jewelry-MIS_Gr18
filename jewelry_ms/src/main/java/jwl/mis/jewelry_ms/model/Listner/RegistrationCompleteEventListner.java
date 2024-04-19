package jwl.mis.jewelry_ms.model.Listner;

import jwl.mis.jewelry_ms.login.Event.RegistrationCompleteEvent;
import jwl.mis.jewelry_ms.model.Admin;
import org.springframework.context.ApplicationListener;

import java.util.UUID;

public class RegistrationCompleteEventListner implements ApplicationListener<RegistrationCompleteEvent> {
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        //will going to createtoken for the User with Link
        Admin admin=event.getAdmin();
        String token= UUID.randomUUID().toString();

        //send MAil to Admin
    }
}
