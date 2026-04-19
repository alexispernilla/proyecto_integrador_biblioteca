package com.Cesde.biblioteca.Repositorio;

import com.Cesde.biblioteca.Modelo.MLibro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILibro extends JpaRepository<MLibro, Long> {
}
