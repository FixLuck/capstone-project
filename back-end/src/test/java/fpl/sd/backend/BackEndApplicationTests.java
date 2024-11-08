package fpl.sd.backend;

import jakarta.xml.bind.DatatypeConverter;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@SpringBootTest
@Slf4j
class BackEndApplicationTests {

    @Test
    void hash() throws NoSuchAlgorithmException {
        String password = "1234456";

        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());

        byte[] disget = md.digest();
        String md5Hash = DatatypeConverter.printHexBinary(disget);

        log.info("MD5 1: {}", md5Hash);

        md.update(password.getBytes());
        disget = md.digest();
        md5Hash = DatatypeConverter.printHexBinary(disget);

        log.info("MD5 2: {}", md5Hash);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        log.info("BCrypt 1: {}", passwordEncoder.encode(password));
        log.info("BCrypt 2: {}", passwordEncoder.encode(password)) ;
    }

}
