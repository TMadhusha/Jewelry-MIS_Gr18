package jwl.mis.jewelry_ms.controller;
import java.lang.String;
import jwl.mis.jewelry_ms.model.Supplier;
import jwl.mis.jewelry_ms.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    @PostMapping("/PSupplier")
    Supplier newSupplier(@RequestBody Supplier newSupplier){
        System.out.println(newSupplier);
        return supplierRepository.save(newSupplier);
    }
    @GetMapping("/GSupplier")
    List<Supplier> getAllSupplier(){
        List<Supplier> suppliers = supplierRepository.findAll();
        System.out.println(suppliers);
        return supplierRepository.findAll();
    }
    @DeleteMapping("/delete/{id}")
    String deleteSupplier(@PathVariable Long sup_Id){
        if(!supplierRepository.existsById(sup_Id)) {
            return "In-Valid Id: "+sup_Id+"Entered";
        }
            supplierRepository.deleteById(sup_Id);
        return "User "+sup_Id+"Successfully deleted";}
    }

