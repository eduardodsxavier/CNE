package com.uniceplac.CNE.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Vlr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal preceptor;
    private BigDecimal gerenciamento;
    private BigDecimal total;
    private BigDecimal totalAluno;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setPreceptor(BigDecimal preceptor) {
        this.preceptor = preceptor;
    }

    public BigDecimal getPreceptor() {
        return preceptor;
    }

    public void setGerenciamento(BigDecimal gerenciamento) {
        this.gerenciamento = gerenciamento;
    }

    public BigDecimal getGerenciamento() {
        return gerenciamento;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotalAluno(BigDecimal totalAluno) {
        this.totalAluno = totalAluno;
    }

    public BigDecimal getTotalAluno() {
        return totalAluno;
    }
}
