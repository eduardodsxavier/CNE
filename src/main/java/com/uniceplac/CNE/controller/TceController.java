package com.uniceplac.CNE.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.uniceplac.CNE.repository.ResponsavelTCERepository;
import com.uniceplac.CNE.model.ResponsavelTCE;


import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/tce")
public class TceController {

   

    private final ResponsavelTCERepository responsavelTceRepository;

    public TceController(ResponsavelTCERepository responsavelTceRepository) {
        this.responsavelTceRepository = responsavelTceRepository;
    }

    @PostMapping
    public ResponseEntity<ResponsavelTCE> salvarTce(@RequestBody ResponsavelTCE responsavelTce) {
        ResponsavelTCE salvo = responsavelTceRepository.save(responsavelTce);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ResponsavelTCE> buscarPorEmail(@PathVariable String email) {
        Optional<ResponsavelTCE> resultado = responsavelTceRepository.findByEmail(email);
        return resultado.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/telefone/{telefone}")
    public ResponseEntity<ResponsavelTCE> buscarPorTelefone(@PathVariable String telefone) {
        Optional<ResponsavelTCE> resultado = responsavelTceRepository.findByTelefone(telefone);
        return resultado.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<ResponsavelTCE>> buscarPorNome(@PathVariable String nome) {
        List<ResponsavelTCE> resultado = responsavelTceRepository.findByNomeContainingIgnoreCase(nome);
        if (resultado.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resultado);
    }
}
