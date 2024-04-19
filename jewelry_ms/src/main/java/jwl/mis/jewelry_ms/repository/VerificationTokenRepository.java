package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public abstract class VerificationTokenRepository implements JpaRepository<VerificationToken, Long> {
}
