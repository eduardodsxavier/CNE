package com.uniceplac.CNE.repository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.uniceplac.CNE.model.User;
import com.uniceplac.CNE.model.Aluno;
import com.uniceplac.CNE.model.Unidade;
import com.uniceplac.CNE.model.Disciplina;
import com.uniceplac.CNE.model.Responsavel;
import com.uniceplac.CNE.model.ResponsavelTCE;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Component
public class IntialDataLoader implements CommandLineRunner{
    private final UserRepository userRepository;
    private final AlunoRepository alunoRepository;
    private final UnidadeRepository unidadeRepository;
    private final DisciplinaRepository disciplinaRepository;
    private final ResponsavelRepository responsavelRepository;
    private final ResponsavelTCERepository responsavelTceRepository;

    public IntialDataLoader(
            UserRepository userRepository, 
            AlunoRepository alunoRepository, 
            UnidadeRepository unidadeRepository,
            DisciplinaRepository disciplinaRepository,
            ResponsavelRepository responsavelRepository,
            ResponsavelTCERepository responsavelTceRepository){
        this.userRepository = userRepository;
        this.alunoRepository = alunoRepository;
        this.unidadeRepository = unidadeRepository;
        this.disciplinaRepository = disciplinaRepository;
        this.responsavelRepository = responsavelRepository;
        this.responsavelTceRepository = responsavelTceRepository;
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
            user.setPassword(encoder.encode("admin"));

            userRepository.save(user);
        }

        if (alunoRepository.count() == 0) {
            alunoRepository.save(new Aluno("123456", "João Pedro", "joao.pedro@uniceplac.edu.br", "A", "Engenharia de Software", "5º Semestre", "Ativo", false));
            alunoRepository.save(new Aluno("123457", "Marina Silva", "marina.silva@uniceplac.edu.br", "B", "Medicina", "3º Semestre", "Ativo", false));
            alunoRepository.save(new Aluno("123458", "Thiago Souza", "thiago.souza@uniceplac.edu.br", "A", "Direito", "7º Semestre", "Trancado", false));
            alunoRepository.save(new Aluno("123459", "Beatriz Oliveira", "beatriz.oliveira@uniceplac.edu.br", "C", "Administração", "8º Semestre", "Formado", false));
            alunoRepository.save(new Aluno("123460", "Lucas Santos", "lucas.santos@uniceplac.edu.br", "B", "Psicologia", "4º Semestre", "Ativo", false));
            alunoRepository.save(new Aluno("123461", "Ana Costa", "ana.costa@uniceplac.edu.br", "A", "Enfermagem", "2º Semestre", "Ativo", false));
            alunoRepository.save(new Aluno("123462", "Gabriel Fernandes", "gabriel.fernandes@uniceplac.edu.br", "A", "Medicina Veterinária", "6º Semestre", "Trancado", false));
            alunoRepository.save(new Aluno("123463", "Camila Ribeiro", "camila.ribeiro@uniceplac.edu.br", "B", "Odontologia", "1º Semestre", "Ativo", false));
        }

        if (unidadeRepository.count() == 0) {
            unidadeRepository.save(new Unidade("Hospital Universitário Sul", false, true, "HUS", false));
            unidadeRepository.save(new Unidade("Clínica Escola de Psicologia", true, false, "CEP", false));
            unidadeRepository.save(new Unidade("Fórum Regional de Taguatinga", false, true, "FRT", false));
            unidadeRepository.save(new Unidade("Laboratório de Anatomia Aplicada", true, false, "LAA", false));
            unidadeRepository.save(new Unidade("Centro de Saúde 01", false, true, "CS01", false));
            unidadeRepository.save(new Unidade("Hospital Santa Regina", false, true, "HSR", false));
            unidadeRepository.save(new Unidade("Centro Integrado de Saúde", true, false, "CIS", false));
            unidadeRepository.save(new Unidade("Centro de Referência de Assistência Social", false, true, "CRAS", true));
        }

        if (disciplinaRepository.count() == 0) {
            saveDisciplinaHelper("Projeto Integrador I", 60, "Prof. Marcos Vieira", "marcos.vieira@uniceplac.edu.br");
            saveDisciplinaHelper("Psicologia Aplicada à Saúde", 80, "Prof. Ricardo Santos", "ricardo.santos@uniceplac.edu.br");
            saveDisciplinaHelper("Direito Constitucional", 60, "Prof. Gustavo Mendes", "gustavo.mendes@uniceplac.edu.br");
            saveDisciplinaHelper("Administração Financeira", 70, "Profª. Simone Azevedo", "simone.azevedo@uniceplac.edu.br");
            saveDisciplinaHelper("Fundamentos de Programação Web", 90, "Prof. Fábio Tavares", "fabio.tavares@uniceplac.edu.br");
        }

        if (responsavelTceRepository.count() == 0) {
            saveTceHelper("Carla Menezes", "Coordenadora de Estágio", "carla.menezes@uniceplac.edu.br", "(61) 99888-1122");
            saveTceHelper("Eduardo Rocha", "Supervisor de Estágio", "eduardo.rocha@uniceplac.edu.br", "(61) 99777-2233");
            saveTceHelper("Fernanda Silva", "Assistente de Estágio", "fernanda.silva@uniceplac.edu.br", "(61) 99666-3344");
            saveTceHelper("Roberto Almeida", "Diretor de Estágios", "roberto.almeida@uniceplac.edu.br", "(61) 99555-4455");
            saveTceHelper("Juliana Tavares", "Técnica Administrativa", "juliana.tavares@uniceplac.edu.br", "(61) 99444-5566");
            saveTceHelper("Tatiane Moura", "Supervisora Pedagógica", "tatiane.moura@uniceplac.edu.br", "(61) 99333-6677");
            saveTceHelper("Leandro Vasconcelos", "Assistente Administrativo", "leandro.vasconcelos@uniceplac.edu.br", "(61) 99222-7788");
            saveTceHelper("Silvia Andrade", "Coordenadora de Estágio", "silvia.andrade@uniceplac.edu.br", "(61) 99111-8899");
        }
    }

    private void saveDisciplinaHelper(String nome, int carga, String profNome, String profEmail) {
        Responsavel resp = new Responsavel();
        resp.setNome(profNome);
        resp.setEmail(profEmail);
        resp.setDeleted(false);
        resp = responsavelRepository.save(resp);

        Disciplina disc = new Disciplina();
        disc.setNome(nome);
        disc.setCargaHoraria(carga);
        disc.setResponsavel(resp);
        disc.setDeleted(false);
        disciplinaRepository.save(disc);
    }

    private void saveTceHelper(String nome, String cargo, String email, String telefone) {
        ResponsavelTCE resp = new ResponsavelTCE();
        resp.setNome(nome);
        resp.setCargo(cargo);
        resp.setEmail(email);
        resp.setTelefone(telefone);
        resp.setDeleted(false);
        responsavelTceRepository.save(resp);
    }
}
