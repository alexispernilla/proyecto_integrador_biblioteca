package com.Cesde.biblioteca.Servicio;

import com.Cesde.biblioteca.Modelo.MLibro;
import com.Cesde.biblioteca.Repositorio.ILibro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SLibro {
    @Autowired
    ILibro iLibro;

    public SLibro(ILibro iLibro) {
        this.iLibro = iLibro;
    }

    // Adicionar
    public MLibro adicionarRegistro(MLibro mLibro) throws Exception{
        try {
            return iLibro.save(mLibro);
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta general
    public List<MLibro> consultaGeneral() throws Exception{
        try{
            return iLibro.findAll();
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Actualizar registro
    public MLibro actualizarRegistro(Long id, MLibro mLibroActualizado) throws Exception {
        try {
            Optional<MLibro> registroExistente = iLibro.findById(id);
            if (registroExistente.isPresent()) {
                MLibro libro = registroExistente.get();
                libro.setTitulo(mLibroActualizado.getTitulo());
                libro.setIsbn(mLibroActualizado.getIsbn());
                libro.setEditorial(mLibroActualizado.getEditorial());
                libro.setAnioPublicacion(mLibroActualizado.getAnioPublicacion());
                libro.setCantidadEjemplares(mLibroActualizado.getCantidadEjemplares());
                libro.setDisponible(mLibroActualizado.isDisponible());
                libro.setAutor(mLibroActualizado.getAutor());
                libro.setCategoria(mLibroActualizado.getCategoria());
                return iLibro.save(libro);
            } else {
                throw new Exception("No se puede actualizar porque el registro no existe");
            }
        } catch (Exception error) {
            throw new Exception(error.getMessage());
        }
    }

    // Consulta individual por llave primaria
    public MLibro consultaIndividualID(Long id) throws Exception{
        try{
            Optional<MLibro> registroEncontrado=iLibro.findById(id);
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
            Optional<MLibro> registroEncontrado=iLibro.findById(id);
            if (registroEncontrado.isPresent()){
                iLibro.deleteById(id);
                return true;
            } else{
                throw new Exception("No se puede eliminar porque el registro no existe");
            }
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }
}
