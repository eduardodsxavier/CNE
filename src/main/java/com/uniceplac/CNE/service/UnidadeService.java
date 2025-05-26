package com.uniceplac.CNE.service;

import com.uniceplac.CNE.repository.UnidadeRepository;
import com.uniceplac.CNE.model.Unidade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class UnidadeService{
    @Autowired
    private UnidadeRepository unidadeRepository;

    public Unidade CadastrarUnidade(Unidade unidade){
        return unidadeRepository.save(unidade);
    }

    public List<Unidade> listarTodas(){
        return unidadeRepository.findAll();
    }
    public Optional <Unidade> buscarPorId(long id){
        return unidadeRepository.findById(id);

    }
    public Optional<Unidade> buscarPorNome(String nome) {
        return unidadeRepository.findByNomeContainingIgnoreCase(nome);
    }
    public Unidade atualizar(Long id, Unidade novaUnidade) {
        return unidadeRepository.findById(id).map(unidade -> {
            unidade.setNome(novaUnidade.getNome());
            unidade.setSigla(novaUnidade.getSigla());
            unidade.setInterno(novaUnidade.getInterno());
            unidade.setConvenioPublico(novaUnidade.getConvenioPublico());
            return unidadeRepository.save(unidade);
        }).orElseThrow(() -> new RuntimeException("Unidade não encontrada"));
    }
    public void deletar(Long id) {
        unidadeRepository.deleteById(id);
    }
}
