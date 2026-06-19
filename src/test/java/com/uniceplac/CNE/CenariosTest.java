package com.uniceplac.CNE;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.uniceplac.CNE.model.Cenario;

@SpringBootTest(properties = {
                "spring.datasource.url=jdbc:postgresql://localhost:15432/mydatabase",
                "spring.datasource.username=myuser",
                "spring.datasource.password=mypassword",
                "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect"
})
@AutoConfigureMockMvc
public class CenariosTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private Cenario cenario;

        @Test
        void CT01_ListagemDosCenarios() throws Exception {
                mockMvc.perform(
                                get("/scenario/list"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").isArray());
        }

        @Test
        void CT02_FiltroPorStatus() throws Exception {
                mockMvc.perform(
                                get("/scenario/list?status=ATIVO"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").isArray());
        }

        @Test
        void CT03_FiltroPorCurso() throws Exception {
                mockMvc.perform(
                                get("/scenario/list?course=ADS"))
                                .andExpect(status().isOk());
        }

        @Test
        void CT04_PermissaoEdicaoUsuarioComum() throws Exception {
                mockMvc.perform(
                                put("/cenario/edit/1")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content(
                                                                """
                                                                                {
                                                                                    "name": "Cenário Editado",
                                                                                }
                                                                                """))
                                .andExpect(status().isForbidden());
        }

        @Test
        void CT05_AcessoDetalheCenario() throws Exception {
                mockMvc.perform(
                                get("/cenario/detail/" + cenario.getId()))
                                .andExpect(status().isOk());
        }

}
