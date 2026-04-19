package com.Cesde.biblioteca.Modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "prestamo")
public class MPrestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate fechaPrestamo;

    @Column(nullable = false)
    private LocalDate fechaDevolucion;

    @Column(length = 30, nullable = false)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private MUsuario usuario;

    @ManyToOne
    @JoinColumn(name = "libro_id", nullable = false)
    private MLibro libro;

    public MPrestamo() {
    }

    public MPrestamo(Long id, LocalDate fechaPrestamo, LocalDate fechaDevolucion,
                     String estado, MUsuario usuario, MLibro libro) {
        this.id = id;
        this.fechaPrestamo = fechaPrestamo;
        this.fechaDevolucion = fechaDevolucion;
        this.estado = estado;
        this.usuario = usuario;
        this.libro = libro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaPrestamo() {
        return fechaPrestamo;
    }

    public void setFechaPrestamo(LocalDate fechaPrestamo) {
        this.fechaPrestamo = fechaPrestamo;
    }

    public LocalDate getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(LocalDate fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public MUsuario getUsuario() {
        return usuario;
    }

    public void setUsuario(MUsuario usuario) {
        this.usuario = usuario;
    }

    public MLibro getLibro() {
        return libro;
    }

    public void setLibro(MLibro libro) {
        this.libro = libro;
    }
}
