package com.uniceplac.CNE.model;

import java.sql.Time;
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

@Entity
@Table(name = "tempo")
public class Tempo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "cenario_id", nullable = false)
    private Cenario cenario;

    @Column(name = "inicio_estagio", nullable = false)
    private LocalDate inicioEstagio;

    @Column(name = "termino_estagio", nullable = false)
    private LocalDate terminoEstagio;

    @Column(name = "dias_da_semana", nullable = false)
    private String diasSemana;

    @Column(nullable = false)
    private boolean feriado;

    @Column(name = "horario_inicial", nullable = false)
    private Time horarioInicial;

    @Column(name = "horario_final", nullable = false)
    private Time horarioFinal;

    @Column(name = "qtd_horas", nullable = false)
    private Time qtdHoras;

    @Column(name = "qtd_dias", nullable = false)
    private int qtdDias;

    private enum Turno {
        MATUTINO,
        VESPERTINO,
        NOTURNO,
        DIURNO
    }

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Turno turno;

    @Column(name = "carga_diaria_a_cumprir", nullable = false)
    private int cargaDiaria;

    @Column(name = "carga_total_a_realizar", nullable = false)
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

    public Cenario getCenario() {
        return cenario;
    }

    public void setCenario(Cenario cenario) {
        this.cenario = cenario;
    }

    public int getQtdDias() {
        return qtdDias;
    }

    public void setDiasSemana(String diasSemana) {
        this.diasSemana = diasSemana;
    }

    public Time getQtdHoras() {
        return qtdHoras;
    }

    public void setHorarioFinal(Time horarioFinal) {
        this.horarioFinal = horarioFinal;
    }

    public int getCargaTotal() {
        return cargaTotal;
    }

    public void setHorarioInicial(Time horarioInicial) {
        this.horarioInicial = horarioInicial;
    }

    public String getDiasSemana() {
        return diasSemana;
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

    public Time getHorarioFinal() {
        return horarioFinal;
    }

    public void setQtdDias(int qtdDias) {
        this.qtdDias = qtdDias;
    }

    public LocalDate getInicioEstagio() {
        return inicioEstagio;
    }

    public void setQtdHoras(Time qtdHoras) {
        this.qtdHoras = qtdHoras;
    }

    public Time getHorarioInicial() {
        return horarioInicial;
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
}
