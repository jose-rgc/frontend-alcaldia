import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { FuncionarioModel } from '../models/funcioanrio.model';
import { FuncionarioService } from '../services/funcionario.service';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, 
    FormsModule, FormDirective, FormLabelDirective, FormControlDirective,
    ButtonDirective, NgStyle, TextColorDirective, ReactiveFormsModule, FormSelectDirective,
    TableDirective, TableColorDirective, TableActiveDirective],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss'
})
export class FuncionarioComponent {
  listaFuncionarios : FuncionarioModel[] =[];
  funcionarioModelo : FuncionarioModel = new FuncionarioModel();
  /**
   * 
   */
  constructor(private funcionarioService : FuncionarioService) {
    this.getFuncionarios();
  }
  getFuncionarios(){
    this.funcionarioService.getTodosLosFuncionarios().subscribe({
      next : (respuesta) => {
        console.log(respuesta);
        this.listaFuncionarios = respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  guardarFuncionario() {
    console.log(this.funcionarioModelo);
    if (this.funcionarioModelo._id == ''){
      console.log("guardar", this.funcionarioModelo);
      this.agregarFuncionario();
    } else {
      console.log("editar", this.funcionarioModelo);
      this.editarFuncionario();
    }


  }

  agregarFuncionario(){
    this.funcionarioService.agregarFuncionario(this.funcionarioModelo).subscribe({
      next : (respuesta) => {
        console.log("Se guardo Exitosamente",respuesta);
        this.getFuncionarios();
        this.funcionarioModelo = new FuncionarioModel();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  eliminarFuncionario(funcionario: FuncionarioModel){
    console.log("item para eliminar", funcionario);
    this.funcionarioService.eliminarFuncionario(funcionario._id).subscribe({
      next : (respuesta) => {
        console.log("Se elimino Exitosamente",respuesta);
        this.getFuncionarios();
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  verFuncionario(funcionario: FuncionarioModel){
    this.funcionarioModelo = funcionario;
  }

  editarFuncionario(){
    this.funcionarioService.editarFuncionario(this.funcionarioModelo).subscribe({
      next : (respuesta) => {
        console.log("Se edito correctamente",respuesta);
        this.getFuncionarios();
        this.funcionarioModelo = new FuncionarioModel();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
