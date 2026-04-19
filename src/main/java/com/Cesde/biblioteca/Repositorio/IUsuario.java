package com.Cesde.biblioteca.Repositorio;

import com.Cesde.biblioteca.Modelo.MUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuario extends JpaRepository<MUsuario, Long> {
}
