package com.uniceplac.CNE;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.uniceplac.CNE.repository.UserRepository;

import com.uniceplac.CNE.model.User;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:postgresql://localhost:15432/mydatabase",
        "spring.datasource.username=myuser",
        "spring.datasource.password=mypassword",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect"
})
@AutoConfigureMockMvc
class LoginIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void CT01_LoginComSucesso() throws Exception {

        String body = """
                {
                    "RA":"0000",
                    "password":"admin"
                }
                """;

        mockMvc.perform(
                post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk());
    }

    @Test
    void CT02_PrimeiroAcesso() throws Exception {

        User user = new User(
                "9999",
                "Usuario Teste",
                "teste@test.com",
                passwordEncoder.encode("9999"),
                false,
                false,
                true);

        userRepository.save(user);

        String body = """
                {
                    "RA":"9999",
                    "password":"9999"
                }
                """;

        mockMvc.perform(
                post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.changePassword").value(true));
    }

    @Test
    void CT03_MatriculaVazia() throws Exception {
        String body = """
                {
                    "RA":"",
                    "password":"admin"
                }
                """;

        mockMvc.perform(
                post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void CT03_MatriculaNaoNumerica() throws Exception {
        String body = """
                {
                    "RA":"abc",
                    "password":"admin"
                }
                """;

        mockMvc.perform(
                post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void CT04_SenhaInvalidaMenosDeOitoCaracteres() throws Exception {
        String body = """
                {
                    "RA":"0000",
                    "password":"1"
                }
                """;

        mockMvc.perform(
                post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void CT04_SenhaInvalidaMaisDeVinteECincoCaracteres() throws Exception {
        String body = """
                {
                    "RA":"0000",
                    "password":"1234567890123456789012345"
                }
                """;

        mockMvc.perform(
                post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void CT05_CredenciaisInvalidas() throws Exception {
        String body = """
                {
                    "RA":"0000",
                    "password":"wrongpassword"
                }
                """;

        mockMvc.perform(
                post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }
    @Test
    void CT06_EsqueceuASenha() throws Exception {

        mockMvc.perform(
            get("/recoverpass")
        )
        .andExpect(status().isOk());

    }   
}