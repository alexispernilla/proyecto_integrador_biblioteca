package com.Cesde.biblioteca.Servicio;

import com.Cesde.biblioteca.Modelo.MUsuario;
import com.Cesde.biblioteca.Repositorio.IUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SUsuario {
    @Autowired
    IUsuario iUsuario;

    public SUsuario(IUsuario iUsuario) {
        this.iUsuario = iUsuario;
    }

    // Adicionar
    public MUsuario adicionarRegistro(MUsuario mUsuario) throws Exception{
        try {
            return iUsuario.save(mUsuario);
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta general
    public List<MUsuario> consultaGeneral() throws Exception{
        try{
            return iUsuario.findAll();
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    // Consulta individual por llave primaria
    public MUsuario consultaIndividualID(Long id) throws Exception{
        try{
            Optional<MUsuario> registroEncontrado=iUsuario.findById(id);
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
            Optional<MUsuario> registroEncontrado=iUsuario.findById(id);
            if (registroEncontrado.isPresent()){
                iUsuario.deleteById(id);
                return true;
            } else{
                throw new Exception("No se puede eliminar porque el registro no existe");
            }
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }
}
