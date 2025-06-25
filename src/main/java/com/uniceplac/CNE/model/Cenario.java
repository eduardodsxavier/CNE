 package com.uniceplac.CNE.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.uniceplac.CNE.enums.Tce;

@Entity
@Table(name="Cenario")
public class Cenario{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long id;
    @OneToOne(mappedBy = "cenario", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Tempo tempo;
    @Column(nullable = false)
    private String anoSemestre;

    @Column(nullable = false)
    private String cenario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @ManyToOne(optional = false)
    @JoinColumn(name = "disciplina_id")
    private Disciplina disciplina;

    @ManyToOne(optional = false)
    @JoinColumn(name = "unidade_id")
    private Unidade unidade;

    @ManyToOne(optional = true)
    @JoinColumn(name = "VLR_id")
    private Vlr vlr;

    @ManyToOne(optional = false)
    @JoinColumn(name = "responsavel_TCE_id")
    private ResponsavelTCE responsavelTCE;

    @ManyToOne(optional = false)
    @JoinColumn(name = "responsavel_IES_id")
    private Responsavel responsavelIES;

    @Column (nullable= false)
    @Enumerated(EnumType.STRING)
    private Tce status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnoSemestre() {
        return anoSemestre;
    }

    public void setAnoSemestre(String anoSemestre) {
        this.anoSemestre = anoSemestre;
    }

    public String getCenario() {
        return cenario;
    }

    public void setCenario(String cenario) {
        this.cenario = cenario;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }

    public Vlr getVlr() {
        return vlr;
    }

    public void setVlr(Vlr vlr) {
        this.vlr = vlr;
    }

    public ResponsavelTCE getResponsavelTCE() {
        return responsavelTCE;
    }

    public void setResponsavelTCE(ResponsavelTCE responsavelTCE) {
        this.responsavelTCE = responsavelTCE;
    }

    public Responsavel getResponsavelIES() {
        return responsavelIES;
    }

    public void setResponsavelIES(Responsavel responsavelIES) {
        this.responsavelIES = responsavelIES;
    }

    public Tce getStatus() {
        return status;
    }

    public void setStatus(Tce status) {
        this.status = status;
    }
    public Tempo getTempo() {
    return tempo;
    }

    public void setTempo(Tempo tempo) {
    this.tempo = tempo;
    }
}
