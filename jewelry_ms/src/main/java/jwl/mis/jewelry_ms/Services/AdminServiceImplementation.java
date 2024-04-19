package jwl.mis.jewelry_ms.Services;

import jwl.mis.jewelry_ms.model.Admin;
import jwl.mis.jewelry_ms.models.AdminModel;
import jwl.mis.jewelry_ms.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImplementation implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private PasswordEncoder passwordEncoder;


    @Override
    public Admin registerAdmin(AdminModel adminModel){
        Admin admin=new Admin();
        admin.setUsername(adminModel.getUsername());
        admin.setEmail(adminModel.getEmail());
        admin.setRole("ADMIN");
        admin.setPassword(passwordEncoder.encode(adminModel.getPassword()));

        adminRepository.save(admin);


        return admin;
    }

}
