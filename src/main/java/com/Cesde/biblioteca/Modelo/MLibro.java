package com.Cesde.biblioteca.Modelo;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "libro")
public class MLibro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 120, nullable = false)
    private String titulo;

    @Column(length = 20, nullable = false, unique = true)
    private String isbn;

    @Column(length = 80)
    private String editorial;

    @Column(nullable = false)
    private int anioPublicacion;

    @Column(nullable = false)
    private int cantidadEjemplares;

    @Column(nullable = false)
    private boolean disponible;

    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private MAutor autor;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private MCategoria categoria;

    @OneToMany(mappedBy = "libro")
    private List<MPrestamo> prestamos;

    public MLibro() {
    }

    public MLibro(Long id, String titulo, String isbn, String editorial, int anioPublicacion,
                  int cantidadEjemplares, boolean disponible, MAutor autor,
                  MCategoria categoria, List<MPrestamo> prestamos) {
        this.id = id;
        this.titulo = titulo;
        this.isbn = isbn;
        this.editorial = editorial;
        this.anioPublicacion = anioPublicacion;
        this.cantidadEjemplares = cantidadEjemplares;
        this.disponible = disponible;
        this.autor = autor;
        this.categoria = categoria;
        this.prestamos = prestamos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getEditorial() {
        return editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public int getAnioPublicacion() {
        return anioPublicacion;
    }

    public void setAnioPublicacion(int anioPublicacion) {
        this.anioPublicacion = anioPublicacion;
    }

    public int getCantidadEjemplares() {
        return cantidadEjemplares;
    }

    public void setCantidadEjemplares(int cantidadEjemplares) {
        this.cantidadEjemplares = cantidadEjemplares;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public MAutor getAutor() {
        return autor;
    }

    public void setAutor(MAutor autor) {
        this.autor = autor;
    }

    public MCategoria getCategoria() {
        return categoria;
    }

    public void setCategoria(MCategoria categoria) {
        this.categoria = categoria;
    }

    public List<MPrestamo> getPrestamos() {
        return prestamos;
    }

    public void setPrestamos(List<MPrestamo> prestamos) {
        this.prestamos = prestamos;
    }
}
