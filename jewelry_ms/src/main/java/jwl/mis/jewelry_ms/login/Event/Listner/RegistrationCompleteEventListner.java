package jwl.mis.jewelry_ms.login.Event.Listner;

import jwl.mis.jewelry_ms.Services.AdminService;
import jwl.mis.jewelry_ms.login.Event.RegistrationCompleteEvent;
import jwl.mis.jewelry_ms.model.Admin;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;
@Slf4j
@Component
public class RegistrationCompleteEventListner implements ApplicationListener<RegistrationCompleteEvent> {

    @Autowired
    private AdminService adminService;
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        //will going to createtoken for the User with Link
        Admin admin=event.getAdmin();
        String token= UUID.randomUUID().toString();
        adminService.saveVeryficationTokenForUser(token,admin);
        //send MAil to Admin
        String url=event.getApplicationUrl()+"VeryFy Registration?token="+token;
        //send veryfificationMail
        log.info("Click the link to veryfy the Account:{}", url);
    }
}
