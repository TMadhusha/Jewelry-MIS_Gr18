package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.dto.SupplierUpdateDto;
import jwl.mis.jewelry_ms.exeption.UserNotFoundException;
import jwl.mis.jewelry_ms.model.Supplier;
import jwl.mis.jewelry_ms.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    @PostMapping("/save-supplier")
    Supplier newSupplier(@RequestBody Supplier newSupplier){
        //System.out.println(newSupplier);
        return supplierRepository.save(newSupplier);
    }
    @GetMapping("/get-supplier")
    List<Supplier>getAllSupplier(){
        return supplierRepository.findAll();
    }

//    @GetMapping("/PSupplier/{sup_id}")
//    Supplier getSuppliyerByName(@PathVariable Long sup_id) {
//        return supplierRepository.findById(sup_id)
//               .orElseThrow(()->new UserNotFoundException(sup_id));
//    }
    @PutMapping("/get-supplier/{sup_id}")
    Supplier updateSupplier(@RequestBody Supplier newSupplier,@PathVariable("sup_id") Long sup_id){
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

//    @PutMapping("/test/{id}")
//    void demofunction(@PathVariable Long id){
//        System.out.println("success call");
//        System.out.println("id : "+ id);
////        System.out.println("dto value : "+ dto.getSuppName());
//    }
//    @PutMapping("/save-supplier/{sup_id}")
//    Supplier test(@RequestBody Supplier newSupplier,@PathVariable("sup_id") Long sup_id){
//        //System.out.println(newSupplier);
//        return null;
//    }

    @DeleteMapping("/delete-supplier/{sup_id}")
    String deletesup(@PathVariable("sup_id") Long sup_id ){
        if(!supplierRepository.existsById(sup_id)){
            throw new UserNotFoundException(sup_id);
        }
        supplierRepository.deleteById(sup_id);
        return sup_id+" "+" was deleted";
    }


}

