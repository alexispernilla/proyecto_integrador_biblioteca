package com.Cesde.biblioteca.Repositorio;

import com.Cesde.biblioteca.Modelo.MEmpleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IEmpleado extends JpaRepository<MEmpleado, Long> {
    Optional<MEmpleado> findByCorreoAndContrasena(String correo, String contrasena);
}
