package com.Cesde.biblioteca.Servicio;

import com.Cesde.biblioteca.Modelo.MCategoria;
import com.Cesde.biblioteca.Repositorio.ICategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SCategoria {
    @Autowired
    ICategoria iCategoria;

    public SCategoria(ICategoria iCategoria) {
        this.iCategoria = iCategoria;
    }

    // Adicionar
    public MCategoria adicionarRegistro(MCategoria mCategoria) throws Exception{
        try {
            return iCategoria.save(mCategoria);
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta general
    public List<MCategoria> consultaGeneral() throws Exception{
        try{
            return iCategoria.findAll();
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta individual por llave primaria
    public MCategoria consultaIndividualID(Long id) throws Exception{
        try{
            Optional<MCategoria> registroEncontrado=iCategoria.findById(id);
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
            Optional<MCategoria> registroEncontrado=iCategoria.findById(id);
            if (registroEncontrado.isPresent()){
                iCategoria.deleteById(id);
                return true;
            } else{
                throw new Exception("No se puede eliminar porque el registro no existe");
            }
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }
}
