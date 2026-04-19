package com.Cesde.biblioteca.MTecnico;

import com.Cesde.biblioteca.Modelo.MUsuario;
import com.Cesde.biblioteca.Servicio.SUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class CUsuario {
    @Autowired
    SUsuario sUsuario;

    // Adicionar
    @PostMapping
    public ResponseEntity<?> adicionarRegistro(@RequestBody MUsuario mUsuario) throws Exception{
        try{
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(this.sUsuario.adicionarRegistro(mUsuario));
        }catch (Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    // Consulta general
    @GetMapping
    public ResponseEntity<?> consultaGeneral() throws Exception{
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.sUsuario.consultaGeneral());
        }catch (Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    // Consulta individual
    @GetMapping("/{id}")
    public ResponseEntity<?> consultaIndividualID(@PathVariable Long id) throws Exception{
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.sUsuario.consultaIndividualID(id));
        }catch (Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarRegistro(@PathVariable Long id) throws Exception{
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.sUsuario.eliminarRegistro(id));
        }catch (Exception error){
            return  ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }
}
