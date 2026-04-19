package com.Cesde.biblioteca.Modelo;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categoria")
public class MCategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 60, nullable = false, unique = true)
    private String nombre;

    @Column(length = 150)
    private String descripcion;

    @OneToMany(mappedBy = "categoria")
    private List<MLibro> libros;

    public MCategoria() {
    }

    public MCategoria(Long id, String nombre, String descripcion, List<MLibro> libros) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.libros = libros;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<MLibro> getLibros() {
        return libros;
    }

    public void setLibros(List<MLibro> libros) {
        this.libros = libros;
    }
}
