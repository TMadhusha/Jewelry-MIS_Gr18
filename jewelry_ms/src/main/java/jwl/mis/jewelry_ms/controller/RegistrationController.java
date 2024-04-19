package jwl.mis.jewelry_ms.controller;

import jakarta.servlet.http.HttpServletRequest;
import jwl.mis.jewelry_ms.Services.AdminService;
import jwl.mis.jewelry_ms.login.Event.RegistrationCompleteEvent;
import jwl.mis.jewelry_ms.model.Admin;
import jwl.mis.jewelry_ms.models.AdminModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @PostMapping("/registerAdmin")
    public String registerAdmin(@RequestBody AdminModel adminModel, final HttpServletRequest request){
        Admin admin=adminService.registerAdmin(adminModel);
        publisher.publishEvent(new RegistrationCompleteEvent(
                admin,
                applicationUrl(request)
        ));

        return "Success";
    }

    private String applicationUrl(HttpServletRequest request) {
        return "Http://"+
                request.getServerName()+
                ":"+
                request.getServerPort()+
                request.getContextPath();
    }
}
