package com.uniceplac.CNE.repository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.uniceplac.CNE.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Component
public class IntialDataLoader implements CommandLineRunner{
    private final UserRepository userRepository;


    public IntialDataLoader(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    @Override
    public void run(String... args) throws Exception{
        if (userRepository.count() == 0) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            User user = new User();
            user.setRA("0000");
            user.setName("admin");
            user.setEmail("exampleEmail@mail.com");
            user.setAdmin(true);
            user.setEnabled(true);
            user.setChangePassword(false);
            user.setPassword(encoder.encode(user.getRA()));

            userRepository.save(user);
        }
    }
}
