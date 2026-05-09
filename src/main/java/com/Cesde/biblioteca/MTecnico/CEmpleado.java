package com.Cesde.biblioteca.MTecnico;

import com.Cesde.biblioteca.Modelo.MEmpleado;
import com.Cesde.biblioteca.Servicio.SEmpleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/empleados")
@CrossOrigin(origins = "*")
public class CEmpleado {
    @Autowired
    SEmpleado sEmpleado;

    @PostMapping
    public ResponseEntity<?> adicionarRegistro(@RequestBody MEmpleado mEmpleado) {
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(this.sEmpleado.adicionarRegistro(mEmpleado));
        }catch (Exception error){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> consultaGeneral() {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(this.sEmpleado.consultaGeneral());
        }catch (Exception error){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> consultaIndividualID(@PathVariable Long id) {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(this.sEmpleado.consultaIndividualID(id));
        }catch (Exception error){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarRegistro(@PathVariable Long id, @RequestBody MEmpleado mEmpleado) {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(this.sEmpleado.actualizarRegistro(id, mEmpleado));
        }catch (Exception error){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarRegistro(@PathVariable Long id) {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(this.sEmpleado.eliminarRegistro(id));
        }catch (Exception error){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        try{
            String correo = credenciales.get("correo");
            String contrasena = credenciales.get("contrasena");
            return ResponseEntity.status(HttpStatus.OK).body(this.sEmpleado.login(correo, contrasena));
        }catch (Exception error){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error.getMessage());
        }
    }
}
