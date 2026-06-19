package com.uniceplac.CNE.repository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.uniceplac.CNE.model.User;
import com.uniceplac.CNE.model.Aluno;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Component
public class IntialDataLoader implements CommandLineRunner{
    private final UserRepository userRepository;
    private final AlunoRepository alunoRepository;

    public IntialDataLoader(UserRepository userRepository, AlunoRepository alunoRepository){
        this.userRepository = userRepository;
        this.alunoRepository = alunoRepository;
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
    }
}
