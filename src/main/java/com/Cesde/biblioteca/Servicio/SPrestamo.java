package com.Cesde.biblioteca.Servicio;

import com.Cesde.biblioteca.Modelo.MPrestamo;
import com.Cesde.biblioteca.Repositorio.IPrestamo;
import com.Cesde.biblioteca.Modelo.MLibro;
import com.Cesde.biblioteca.Repositorio.ILibro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SPrestamo {
    @Autowired
    IPrestamo iPrestamo;

    @Autowired
    ILibro iLibro;

    public SPrestamo(IPrestamo iPrestamo, ILibro iLibro) {
        this.iPrestamo = iPrestamo;
        this.iLibro = iLibro;
    }

    // Adicionar
    public MPrestamo adicionarRegistro(MPrestamo mPrestamo) throws Exception{
        try {
            Optional<MLibro> libroOptional = iLibro.findById(mPrestamo.getLibro().getId());
            if (libroOptional.isPresent()) {
                MLibro libro = libroOptional.get();
                if (libro.getCantidadEjemplares() > 0 && libro.isDisponible()) {
                    libro.setCantidadEjemplares(libro.getCantidadEjemplares() - 1);
                    if (libro.getCantidadEjemplares() == 0) {
                        libro.setDisponible(false);
                    }
                    iLibro.save(libro);
                    
                    if (mPrestamo.getEstado() == null || mPrestamo.getEstado().isEmpty()) {
                        mPrestamo.setEstado("Activo");
                    }
                    
                    return iPrestamo.save(mPrestamo);
                } else {
                    throw new Exception("El libro no está disponible para préstamo.");
                }
            } else {
                throw new Exception("El libro especificado no existe.");
            }
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Actualizar registro
    public MPrestamo actualizarRegistro(Long id, MPrestamo mPrestamoActualizado) throws Exception {
        try {
            Optional<MPrestamo> registroExistente = iPrestamo.findById(id);
            if (registroExistente.isPresent()) {
                MPrestamo prestamo = registroExistente.get();
                prestamo.setFechaPrestamo(mPrestamoActualizado.getFechaPrestamo());
                prestamo.setFechaDevolucion(mPrestamoActualizado.getFechaDevolucion());
                prestamo.setEstado(mPrestamoActualizado.getEstado());
                prestamo.setUsuario(mPrestamoActualizado.getUsuario());
                prestamo.setLibro(mPrestamoActualizado.getLibro());
                return iPrestamo.save(prestamo);
            } else {
                throw new Exception("No se puede actualizar porque el registro no existe");
            }
        } catch (Exception error) {
            throw new Exception(error.getMessage());
        }
    }

    // Devolver libro
    public MPrestamo devolverLibro(Long id) throws Exception {
        try {
            Optional<MPrestamo> registroEncontrado = iPrestamo.findById(id);
            if (registroEncontrado.isPresent()) {
                MPrestamo prestamo = registroEncontrado.get();
                if ("Devuelto".equalsIgnoreCase(prestamo.getEstado())) {
                    throw new Exception("El libro ya ha sido devuelto.");
                }
                prestamo.setEstado("Devuelto");
                
                Optional<MLibro> libroOptional = iLibro.findById(prestamo.getLibro().getId());
                if (libroOptional.isPresent()) {
                    MLibro libro = libroOptional.get();
                    libro.setCantidadEjemplares(libro.getCantidadEjemplares() + 1);
                    libro.setDisponible(true);
                    iLibro.save(libro);
                }
                
                return iPrestamo.save(prestamo);
            } else {
                throw new Exception("Registro de préstamo no encontrado.");
            }
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta general
    public List<MPrestamo> consultaGeneral() throws Exception{
        try{
            return iPrestamo.findAll();
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta individual por llave primaria
    public MPrestamo consultaIndividualID(Long id) throws Exception{
        try{
            Optional<MPrestamo> registroEncontrado=iPrestamo.findById(id);
            if (registroEncontrado.isPresent())
                return registroEncontrado.get();
            else
                throw new Exception("Registro no encontrado");
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Eliminar registro
    public Boolean eliminarRegistro(Long id) throws Exception{
        try{
            Optional<MPrestamo> registroEncontrado=iPrestamo.findById(id);
            if (registroEncontrado.isPresent()){
                iPrestamo.deleteById(id);
                return true;
            } else{
                throw new Exception("No se puede eliminar porque el registro no existe");
            }
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }
}
