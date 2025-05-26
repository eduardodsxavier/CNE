package com.uniceplac.CNE.service;

import com.uniceplac.CNE.model.Vlr;
import com.uniceplac.CNE.repository.VlrRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VlrService{

    private final VlrRepository vlrRepository;

    public VlrService(VlrRepository vlrRepository) {
        this.vlrRepository = vlrRepository;
    }
   
    public Vlr salvar(Vlr vlr) {
        return vlrRepository.save(vlr);
    }
    public List<Vlr> listarTodos() {
        return vlrRepository.findAll();
    }
     public Vlr atualizar(Long id, Vlr novoVlr) {
        return vlrRepository.findById(id).map(vlr -> {
            vlr.setPreceptor(novoVlr.getPreceptor());
            vlr.setGerenciamento(novoVlr.getGerenciamento());
            vlr.setTotal(novoVlr.getTotal());
            vlr.setTotalAluno(novoVlr.getTotalAluno());
            return vlrRepository.save(vlr);
        }).orElseThrow(() -> new RuntimeException("VLR não encontrado"));
    }
    public void deletar(Long id) {
        vlrRepository.deleteById(id);
    }


}