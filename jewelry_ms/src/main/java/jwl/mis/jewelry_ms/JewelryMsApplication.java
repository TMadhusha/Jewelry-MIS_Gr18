package jwl.mis.jewelry_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan("jwl.mis.jewelry_ms.repository")
public class  JewelryMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(JewelryMsApplication.class, args);
	}

}
