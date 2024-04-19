package jwl.mis.jewelry_ms.Services;

import jwl.mis.jewelry_ms.model.Admin;
import jwl.mis.jewelry_ms.models.AdminModel;

public interface AdminService {


    Admin registerAdmin(AdminModel adminModel);

    void saveVeryficationTokenForUser(String token, Admin admin);
}



