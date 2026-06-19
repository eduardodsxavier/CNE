package com.uniceplac.CNE;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.uniceplac.CNE.repository.*;
import com.uniceplac.CNE.model.*;
import com.uniceplac.CNE.security.JwtTokenService;
import com.uniceplac.CNE.security.UserDetailsImpl;
import java.util.List;

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
        private CenarioRepository cenarioRepository;

        @Autowired
        private AlunoRepository alunoRepository;

        @Autowired
        private DisciplinaRepository disciplinaRepository;

        @Autowired
        private UnidadeRepository unidadeRepository;

        @Autowired
        private ResponsavelTCERepository responsavelTCERepository;

        @Autowired
        private ResponsavelRepository responsavelRepository;

        @Autowired
        private TempoRepository tempoRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private JwtTokenService jwtTokenService;

        private String adminToken;
        private String userToken;

        @BeforeEach
        void setup() {
            // Seeding users and generating tokens
            User admin = userRepository.findByRA("0000").orElse(null);
            if (admin == null) {
                admin = new User("0000", "admin", "admin@test.com", "admin", true, false, true);
                userRepository.save(admin);
            }
            adminToken = jwtTokenService.generateToken(new UserDetailsImpl(admin));

            User user = userRepository.findByRA("1111").orElse(null);
            if (user == null) {
                user = new User("1111", "Common User", "user@test.com", "user", false, false, true);
                userRepository.save(user);
            }
            userToken = jwtTokenService.generateToken(new UserDetailsImpl(user));

            if (cenarioRepository.count() == 0) {
                Aluno aluno = new Aluno("123456", "João Pedro", "joao@test.com", "A", "Curso Teste", "1º Semestre", "Ativo", false);
                alunoRepository.save(aluno);

                Disciplina disciplina = new Disciplina();
                disciplina.setNome("Disciplina Teste");
                disciplina.setCargaHoraria(60);
                disciplinaRepository.save(disciplina);

                Unidade unidade = new Unidade();
                unidade.setNome("Unidade Teste");
                unidade.setSigla("UT");
                unidadeRepository.save(unidade);

                ResponsavelTCE respTce = new ResponsavelTCE();
                respTce.setNome("Resp TCE");
                respTce.setEmail("resp@tce.com");
                respTce.setTelefone("123456");
                respTce.setCargo("Cargo Teste");
                responsavelTCERepository.save(respTce);

                Responsavel respIes = new Responsavel();
                respIes.setNome("Resp IES");
                respIes.setEmail("resp@ies.com");
                responsavelRepository.save(respIes);

                Tempo tempo = new Tempo();
                tempo.setDiasSemana("Segunda");
                tempo.setCargaDiaria(6);
                tempo.setTurno(com.uniceplac.CNE.enums.Turno.MATUTINO);
                tempoRepository.save(tempo);

                Cenario c = new Cenario();
                c.setAnoSemestre("2026/1");
                c.setCenario("Cenario Teste");
                c.setStatus(com.uniceplac.CNE.enums.Tce.ANDAMENTO);
                c.setAluno(aluno);
                c.setDisciplina(disciplina);
                c.setUnidade(unidade);
                c.setResponsavelTCE(respTce);
                c.setResponsavelIES(respIes);
                c.setTempo(tempo);
                cenarioRepository.save(c);
            }
        }

        @Test
        void CT01_ListagemDosCenarios() throws Exception {
                mockMvc.perform(
                                get("/cenario/list")
                                        .header("Authorization", "Bearer " + adminToken))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").isArray());
        }

        @Test
        void CT02_FiltroPorStatus() throws Exception {
                mockMvc.perform(
                                get("/cenario/list?status=ANDAMENTO")
                                        .header("Authorization", "Bearer " + adminToken))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$").isArray());
        }

        @Test
        void CT03_FiltroPorCurso() throws Exception {
                mockMvc.perform(
                                get("/cenario/list?course=ADS")
                                        .header("Authorization", "Bearer " + adminToken))
                                .andExpect(status().isOk());
        }

        @Test
        void CT04_PermissaoEdicaoUsuarioComum() throws Exception {
                Cenario temp = cenarioRepository.findAll().stream().findFirst().orElse(null);
                Long id = temp != null ? temp.getId() : 1L;
                mockMvc.perform(
                                put("/cenario/" + id)
                                                .header("Authorization", "Bearer " + userToken)
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content(
                                                                """
                                                                                {
                                                                                    "anoSemestre": "2025/1",
                                                                                    "cenario": "Cenário Editado",
                                                                                    "status": "ANDAMENTO"
                                                                                }
                                                                                """))
                                .andExpect(status().isForbidden());
        }

        @Test
        void CT05_AcessoDetalheCenario() throws Exception {
                Cenario temp = cenarioRepository.findAll().stream().findFirst().orElse(null);
                Long id = temp != null ? temp.getId() : 1L;
                mockMvc.perform(
                                get("/cenario/" + id)
                                        .header("Authorization", "Bearer " + adminToken))
                                .andExpect(status().isOk());
        }
}
