package com.uniceplac.CNE.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import com.uniceplac.CNE.repository.VlrRepository;
import com.uniceplac.CNE.model.Vlr;

@RestController
@RequestMapping("/vlr")
public class VlrController {

    private final VlrRepository vlrRepository;

    public VlrController(VlrRepository vlrRepository) {
        this.vlrRepository = vlrRepository;
    }

    @PostMapping
    public ResponseEntity<Vlr> salvarVlr(@RequestBody Vlr vlr) {
        Vlr salvo = vlrRepository.save(vlr);
        return ResponseEntity.ok(salvo);
    }
}
