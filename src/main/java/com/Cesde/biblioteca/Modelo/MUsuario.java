package com.Cesde.biblioteca.Modelo;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "usuario")
public class MUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 80, nullable = false)
    private String nombre;

    @Column(length = 80, nullable = false)
    private String apellido;

    @Column(length = 20, nullable = false, unique = true)
    private String documento;

    @Column(length = 100, nullable = false, unique = true)
    private String correo;

    @Column(length = 20)
    private String telefono;

    @OneToMany(mappedBy = "usuario")
    private List<MPrestamo> prestamos;

    public MUsuario() {
    }

    public MUsuario(Long id, String nombre, String apellido, String documento,
                    String correo, String telefono, List<MPrestamo> prestamos) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.correo = correo;
        this.telefono = telefono;
        this.prestamos = prestamos;
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

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public List<MPrestamo> getPrestamos() {
        return prestamos;
    }

    public void setPrestamos(List<MPrestamo> prestamos) {
        this.prestamos = prestamos;
    }
}
