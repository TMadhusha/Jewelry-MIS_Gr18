package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.model.Supplier;
import jwl.mis.jewelry_ms.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    @PostMapping("/PSupplier")
    Supplier newSupplier(@RequestBody Supplier newSupplier){
        return supplierRepository.save(newSupplier);
    }
    @GetMapping("/GSupplier")
    List<Supplier> getAllSupplier(){
        return supplierRepository.findAll();
    }
}
