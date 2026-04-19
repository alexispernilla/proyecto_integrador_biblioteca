package com.Cesde.biblioteca.MTecnico;

import com.Cesde.biblioteca.Modelo.MCategoria;
import com.Cesde.biblioteca.Servicio.SCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CCategoria {
    @Autowired
    SCategoria sCategoria;

    // Adicionar
    @PostMapping
    public ResponseEntity<?> adicionarRegistro(@RequestBody MCategoria mCategoria) throws Exception{
        try{
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(this.sCategoria.adicionarRegistro(mCategoria));
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
                    .body(this.sCategoria.consultaGeneral());
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
                    .body(this.sCategoria.consultaIndividualID(id));
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
                    .body(this.sCategoria.eliminarRegistro(id));
        }catch (Exception error){
            return  ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }
}
