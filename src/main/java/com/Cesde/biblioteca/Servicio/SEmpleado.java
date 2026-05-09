package com.Cesde.biblioteca.Servicio;

import com.Cesde.biblioteca.Modelo.MEmpleado;
import com.Cesde.biblioteca.Repositorio.IEmpleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SEmpleado {
    @Autowired
    IEmpleado iEmpleado;

    public MEmpleado adicionarRegistro(MEmpleado mEmpleado) throws Exception{
        try {
            return iEmpleado.save(mEmpleado);
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    public List<MEmpleado> consultaGeneral() throws Exception{
        try{
            return iEmpleado.findAll();
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    public MEmpleado consultaIndividualID(Long id) throws Exception{
        try{
            Optional<MEmpleado> registro = iEmpleado.findById(id);
            if (registro.isPresent()) return registro.get();
            else throw new Exception("Empleado no encontrado");
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    public MEmpleado actualizarRegistro(Long id, MEmpleado mEmpleadoNuevo) throws Exception {
        try {
            Optional<MEmpleado> registroExistente = iEmpleado.findById(id);
            if (registroExistente.isPresent()) {
                MEmpleado empleado = registroExistente.get();
                empleado.setNombre(mEmpleadoNuevo.getNombre());
                empleado.setCorreo(mEmpleadoNuevo.getCorreo());
                empleado.setContrasena(mEmpleadoNuevo.getContrasena());
                empleado.setRol(mEmpleadoNuevo.getRol());
                return iEmpleado.save(empleado);
            } else {
                throw new Exception("El empleado no existe");
            }
        } catch (Exception error) {
            throw new Exception(error.getMessage());
        }
    }

    public Boolean eliminarRegistro(Long id) throws Exception{
        try{
            if(iEmpleado.existsById(id)){
                iEmpleado.deleteById(id);
                return true;
            } else {
                throw new Exception("Empleado no encontrado");
            }
        }catch (Exception error){
            throw new Exception(error.getMessage());
        }
    }

    public MEmpleado login(String correo, String contrasena) throws Exception {
        try {
            Optional<MEmpleado> empleado = iEmpleado.findByCorreoAndContrasena(correo, contrasena);
            if(empleado.isPresent()) {
                return empleado.get();
            } else {
                throw new Exception("Credenciales incorrectas");
            }
        } catch(Exception error) {
            throw new Exception(error.getMessage());
        }
    }
}
