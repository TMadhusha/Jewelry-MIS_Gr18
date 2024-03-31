package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.exeption.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Admin;
import jwl.mis.jewelry_ms.model.Supplier;
import jwl.mis.jewelry_ms.repository.AdminRepository;
import jwl.mis.jewelry_ms.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/admin-panel/login")
public class EmployeeLoginController {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private AdminRepository adminRepository;


    @PostMapping("/save/{sup_id}")
    String saveAdmin(@RequestBody Admin newAdmin ,@PathVariable("sup_id") Long id ){
        if(!employeeRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        return adminRepository.save(newAdmin).toString();
    }
}
