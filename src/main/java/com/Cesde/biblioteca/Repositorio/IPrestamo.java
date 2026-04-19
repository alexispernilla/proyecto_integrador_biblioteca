package com.Cesde.biblioteca.Repositorio;

import com.Cesde.biblioteca.Modelo.MPrestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPrestamo extends JpaRepository<MPrestamo, Long> {
}
