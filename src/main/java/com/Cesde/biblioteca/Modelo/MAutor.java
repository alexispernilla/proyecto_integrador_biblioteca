package com.Cesde.biblioteca.Modelo;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "autor")
public class MAutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 80, nullable = false)
    private String nombre;

    @Column(length = 80, nullable = false)
    private String apellido;

    @Column(length = 50)
    private String nacionalidad;

    @OneToMany(mappedBy = "autor")
    private List<MLibro> libros;

    public MAutor() {
    }

    public MAutor(Long id, String nombre, String apellido, String nacionalidad, List<MLibro> libros) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacionalidad = nacionalidad;
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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public List<MLibro> getLibros() {
        return libros;
    }

    public void setLibros(List<MLibro> libros) {
        this.libros = libros;
    }
}
