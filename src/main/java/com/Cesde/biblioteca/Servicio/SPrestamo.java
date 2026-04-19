package com.Cesde.biblioteca.Servicio;

import com.Cesde.biblioteca.Modelo.MPrestamo;
import com.Cesde.biblioteca.Repositorio.IPrestamo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SPrestamo {
    @Autowired
    IPrestamo iPrestamo;

    public SPrestamo(IPrestamo iPrestamo) {
        this.iPrestamo = iPrestamo;
    }

    // Adicionar
    public MPrestamo adicionarRegistro(MPrestamo mPrestamo) throws Exception{
        try {
            return iPrestamo.save(mPrestamo);
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
