package com.uniceplac.CNE.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Unidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private boolean interno; 
    private boolean convenioPublico;
    private String sigla;
    private boolean deleted;

    Unidade() {}
    
   Unidade (Long id, String nome, boolean interno, boolean convenioPublico, String sigla, boolean deleted) {
        this.id = id;
        this.nome = nome;
        this.interno = interno;
        this.convenioPublico = convenioPublico;
        this.sigla = sigla;
        this.deleted = deleted;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setInterno(boolean interno) {
        this.interno = interno;
    }

    public boolean getInterno() {
        return interno;
    }

    public void setConvenioPublico(boolean convenioPublico) {
        this.convenioPublico = convenioPublico;
    }

    public boolean getConvenioPublico() {
        return convenioPublico;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getSigla() {
        return sigla;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public boolean getDeleted() {
        return deleted;
    }
}
