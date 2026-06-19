package com.uniceplac.CNE;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:postgresql://localhost:15432/mydatabase",
        "spring.datasource.username=myuser",
        "spring.datasource.password=mypassword",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect",
})
@AutoConfigureMockMvc
public class RegisterIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void CT01_CadastroComSucesso() throws Exception {
        String body = """
                {
                    "RA":"1236",
                    "nome":"Usuario Cadastro Teste",
                    "email":"usuario.cadastro@teste.com",
                    "admin":false
                }
                """;

        mockMvc.perform(
                post("/user/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated());
    }

    // CT02_CadastroComCamposObrigatoriosVazios
    @Test
    void CT02_RAVazio() throws Exception {
        String body = """
                {
                    "RA":"",
                    "nome":"user",
                    "email":"user@example.com",
                    "admin":false
                }
                """;

        mockMvc.perform(
                post("/user/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void CT02_NomeVazio() throws Exception {
        String body = """
                {
                    "RA":"1237",
                    "nome":"",
                    "email":"user@example.com",
                    "admin":false
                }
                    """;

        mockMvc.perform(
                post("/user/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    void CT02_EmailVazio() throws Exception {
        String body = """
                {
                    "RA":"1238",
                    "nome":"user",
                    "email":"",
                    "admin":false
    }             """;

        mockMvc.perform(
                post("/user/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }
}
