package jwl.mis.jewelry_ms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Supplier {

    @Id
    @GeneratedValue
    private Long sup_Id;
    private String supName;
    private String address;
    private String itemid;
    private String quantity;
    private String phonrnumber;
    private String email;

    public Long getSup_Id() {
        return sup_Id;
    }

    public void setSup_Id(Long sup_Id) {
        this.sup_Id = sup_Id;
    }

    public String getSupName() {
        return supName;
    }

    public void setSupName(String supName) {
        this.supName = supName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getItemid() {
        return itemid;
    }

    public void setItemid(String itemid) {
        this.itemid = itemid;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getPhonrnumber() {
        return phonrnumber;
    }

    public void setPhonrnumber(String phonrnumber) {
        this.phonrnumber = phonrnumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
