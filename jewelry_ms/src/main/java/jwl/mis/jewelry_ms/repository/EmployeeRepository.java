package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
}
