package com.uniceplac.CNE.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Disciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private int cargaHoraria;
    private boolean deleted;


   public Disciplina() {}


    Disciplina(Long id, String nome, int cargaHoraria, boolean deleted) {
        this.id = id;
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.deleted = deleted;
    }

    @ManyToOne
    @JoinColumn(name = "responsavel_id")
    private Responsavel responsavel;
    
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

    public void setCargaHoraria(int cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    public int getCargaHoraria() {
        return cargaHoraria;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public boolean getDeleted() {
        return deleted;
    }
    public Responsavel getResponsavel() {
        return responsavel;
    }
    public void setResponsavel(Responsavel responsavel) {
        this.responsavel = responsavel;
    }
}
