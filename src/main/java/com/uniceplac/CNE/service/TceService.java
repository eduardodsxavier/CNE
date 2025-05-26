package com.uniceplac.CNE.service;

import com.uniceplac.CNE.model.ResponsavelTCE;
import com.uniceplac.CNE.repository.ResponsavelTCERepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TceService {

    private final ResponsavelTCERepository responsavelTCERepository;

    @Autowired
    public TceService(ResponsavelTCERepository responsavelTCERepository) {
        this.responsavelTCERepository = responsavelTCERepository;
    }

    public ResponsavelTCE salvarTce(ResponsavelTCE responsavel) {
        return responsavelTCERepository.save(responsavel);
    }

    public List<ResponsavelTCE> buscarPorNome(String nome) {
        return responsavelTCERepository.findByNomeContainingIgnoreCase(nome.trim());
    }

    public Optional<ResponsavelTCE> buscarPorEmail(String email) {
        return responsavelTCERepository.findByEmail(email.trim());
    }

    public Optional<ResponsavelTCE> buscarPorTelefone(String telefone) {
        return responsavelTCERepository.findByTelefone(telefone.trim());
    }
}
