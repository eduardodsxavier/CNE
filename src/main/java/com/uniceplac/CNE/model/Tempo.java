package com.uniceplac.CNE.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.uniceplac.CNE.enums.Turno;
@Entity
@Table(name = "tempo")
public class Tempo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private Turno turno;

    @Column(name = "inicio_estagio", nullable = true)
    private LocalDate inicioEstagio;

    @Column(name = "termino_estagio", nullable = true)
    private LocalDate terminoEstagio;

    @Column(name = "dias_da_semana", nullable = true)
    private String diasSemana;

    @Column(nullable = true)
    private boolean feriado;

    @Column(name = "horario_inicial", nullable = true)
    private String horarioInicial;

    @Column(name = "horario_final", nullable = true)
    private String horarioFinal;

    @Column(name = "qtd_horas", nullable = true)
    private String qtdHoras;

    @Column(name = "qtd_dias", nullable = true)
    private int qtdDias;

    @Column(name = "carga_diaria_a_cumprir", nullable = true)
    private int cargaDiaria;

    @Column(name = "carga_total_a_realizar", nullable = true)
    private int cargaTotal;

    public Long getId() {
        return id;
    }

    public void setCargaDiaria(int cargaDiaria) {
        this.cargaDiaria = cargaDiaria;
    }


    public Turno getTurno() {
        return turno;
    }

    public void setCargaTotal(int cargaTotal) {
        this.cargaTotal = cargaTotal;
    }

    public int getQtdDias() {
        return qtdDias;
    }

    public int getCargaTotal() {
        return cargaTotal;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCargaDiaria() {
        return cargaDiaria;
    }

    public void setInicioEstagio(LocalDate inicioEstagio) {
        this.inicioEstagio = inicioEstagio;
    }


    public void setQtdDias(int qtdDias) {
        this.qtdDias = qtdDias;
    }

    public LocalDate getInicioEstagio() {
        return inicioEstagio;
    }


    public void setTerminoEstagio(LocalDate terminoEstagio) {
        this.terminoEstagio = terminoEstagio;
    }

    public LocalDate getTerminoEstagio() {
        return terminoEstagio;
    }

    public void setTurno(Turno turno) {
        this.turno = turno;
    }

    public void setFeriado(boolean feriado) {
        this.feriado = feriado;
    }
    public void setDiasSemana(String diasSemana) {
        this.diasSemana = diasSemana;
    }
    public String getDiasSemana() {
        return diasSemana;
    }
    public String getQtdHoras() {
        return qtdHoras;
    }
    public void setQtdHoras(String qtdHoras) {
        this.qtdHoras = qtdHoras;
    }
    public String getHorarioFinal() {
        return horarioFinal;
    }
    public void setHorarioFinal(String horarioFinal) {
        this.horarioFinal = horarioFinal;
    }
    public String getHorarioInicial() {
        return horarioInicial;
    }
    public void setHorarioInicial(String horarioInicial) {
        this.horarioInicial = horarioInicial;
    }
}
