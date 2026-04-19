package com.Cesde.biblioteca.Servicio;

import com.Cesde.biblioteca.Modelo.MAutor;
import com.Cesde.biblioteca.Repositorio.IAutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SAutor {
    @Autowired
    IAutor iAutor;

    public SAutor(IAutor iAutor) {
        this.iAutor = iAutor;
    }

    // Adicionar
    public MAutor adicionarRegistro(MAutor mAutor) throws Exception{
        try {
            return iAutor.save(mAutor);
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta general
    public List<MAutor> consultaGeneral() throws Exception{
        try{
            return iAutor.findAll();
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta individual por llave primaria
    public MAutor consultaIndividualID(Long id) throws Exception{
        try{
            Optional<MAutor> registroEncontrado=iAutor.findById(id);
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
            Optional<MAutor> registroEncontrado=iAutor.findById(id);
            if (registroEncontrado.isPresent()){
                iAutor.deleteById(id);
                return true;
            } else{
                throw new Exception("No se puede eliminar porque el registro no existe");
            }
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }
}
