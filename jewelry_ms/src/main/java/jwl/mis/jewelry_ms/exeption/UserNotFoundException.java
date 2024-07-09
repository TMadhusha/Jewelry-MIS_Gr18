package jwl.mis.jewelry_ms.exeption;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long sup_id){
        super(sup_id+" "+"Is not Valid...");
    }
}
