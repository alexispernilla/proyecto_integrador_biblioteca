package com.Cesde.biblioteca.Repositorio;

import com.Cesde.biblioteca.Modelo.MCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoria extends JpaRepository<MCategoria, Long> {
}
