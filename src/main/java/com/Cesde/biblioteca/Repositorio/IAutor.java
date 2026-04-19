package com.Cesde.biblioteca.Repositorio;

import com.Cesde.biblioteca.Modelo.MAutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAutor extends JpaRepository<MAutor, Long> {
}
