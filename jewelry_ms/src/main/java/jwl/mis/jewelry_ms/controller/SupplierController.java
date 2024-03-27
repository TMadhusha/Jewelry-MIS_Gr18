package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.exeption.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Supplier;
import jwl.mis.jewelry_ms.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    @PostMapping("/PSupplier")
    Supplier newSupplier(@RequestBody Supplier newSupplier){
        //System.out.println(newSupplier);
        return supplierRepository.save(newSupplier);
    }
    @GetMapping("/GSupplier")
    List<Supplier>getAllSupplier(){
        return supplierRepository.findAll();
    }

//    @GetMapping("/PSupplier/{sup_id}")
//    Supplier getSuppliyerByName(@PathVariable Long sup_id) {
//        return supplierRepository.findById(sup_id)
//               .orElseThrow(()->new UserNotFoundException(sup_id));
//    }
    @PutMapping("/GSupplier/{sup_id}")
    Supplier updateSupplier(@RequestBody Supplier newSupplier,@PathVariable Long sup_id){
        return supplierRepository.findById(sup_id)
                .map(supplier->{
                    supplier.setSupname(newSupplier.getSupname());
                    supplier.setitemid(newSupplier.getitemid());
                    supplier.setPhonenumber(newSupplier.getPhonenumber());
                    supplier.setQuantity(newSupplier.getQuantity());
                    supplier.setEmail(newSupplier.getEmail());
                    return supplierRepository.save(supplier);
                }).orElseThrow(()->new UserNotFoundException(sup_id));
    }

    @DeleteMapping("/GSupplier/{sup_id}")
    String deletesup(@PathVariable Long sup_id ){
        if(!supplierRepository.existsById(sup_id)){
            throw new UserNotFoundException(sup_id);
        }
        supplierRepository.deleteById(sup_id);
        return sup_id+" "+" was deleted";
    }


}

