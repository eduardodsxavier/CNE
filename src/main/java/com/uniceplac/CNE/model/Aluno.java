package com.uniceplac.CNE.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Aluno {
    @Id
    private String ra;
    private String nome;
    private String email;
    private String turma;
    private String curso;
    private boolean deleted;
    
    public Aluno() {}

    public Aluno(String ra, String nome, String email, String turma, String curso, boolean deleted) {
        this.ra = ra;
        this.nome = nome;
        this.email = email;
        this.turma = turma;
        this.curso = curso;
        this.deleted = deleted;
    }

    public String getRa() {
        return ra;
    }
    public void setRa(String ra) {
        this.ra = ra;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setTurma(String turma) {
        this.turma = turma;
    }

    public String getTurma() {
        return turma;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public String getCurso() {
        return curso;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public boolean getDeleted() {
        return deleted;
    }
}
