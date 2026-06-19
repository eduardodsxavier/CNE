package com.uniceplac.CNE;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import com.uniceplac.CNE.repository.UserRepository;
import com.uniceplac.CNE.model.User;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:postgresql://localhost:15432/mydatabase",
        "spring.datasource.username=myuser",
        "spring.datasource.password=mypassword",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect",
})
@AutoConfigureMockMvc
public class RecoverPassword {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;
        
    @Test
    void CT01_SolicitacaoValidaRecuperacaoSenha() throws Exception {
        User user = new User(
                "9999",
                "Usuario Teste",
                "usuario@teste.com",
                "senha",
                false,
                false,
                true);
        userRepository.save(user);

        mockMvc.perform(
                get("/user/requestToChangePassword/9999"))
                .andExpect(status().isOk());

        User updatedUser = userRepository.findByRA("9999").get();
        assertTrue(updatedUser.getChangePassword());
    }

    @Test
    void CT02_MatriculaInexistente() throws Exception {
        User user = new User(
                "9999",
                "Usuario Teste",
                "usuario@teste.com",
                "senha",
                false,
                false,
                true);
        userRepository.save(user);

        mockMvc.perform(
                get("/user/requestToChangePassword/1111"))
                .andExpect(status().isBadRequest());
        User unchangedUser = userRepository.findByRA("9999").get();
        assertFalse(unchangedUser.getChangePassword());
    }
}