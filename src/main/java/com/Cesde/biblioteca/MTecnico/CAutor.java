package com.Cesde.biblioteca.MTecnico;

import com.Cesde.biblioteca.Modelo.MAutor;
import com.Cesde.biblioteca.Servicio.SAutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/autors")
@CrossOrigin(origins = "*")
public class CAutor {
    @Autowired
    SAutor sAutor;

    // Adicionar
    @PostMapping
    public ResponseEntity<?> adicionarRegistro(@RequestBody MAutor mAutor) throws Exception{
        try{
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(this.sAutor.adicionarRegistro(mAutor));
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
                    .body(this.sAutor.consultaGeneral());
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
                    .body(this.sAutor.consultaIndividualID(id));
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
                    .body(this.sAutor.eliminarRegistro(id));
        }catch (Exception error){
            return  ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }
}
