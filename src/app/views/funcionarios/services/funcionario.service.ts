import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FuncionarioModel } from "../models/funcioanrio.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class FuncionarioService{
    //Url de su api (backend)
    private API_URL = 'http://localhost:3100/funcionarios'
    constructor(private http: HttpClient){

    }
    getTodosLosFuncionarios ():Observable<FuncionarioModel[]> {
        return this.http.get<FuncionarioModel[]>(`${this.API_URL}/traerFuncionarios`);
    }

    agregarFuncionario(funcionario: FuncionarioModel) : Observable<FuncionarioModel> {
        return this.http.post<FuncionarioModel>(`${this.API_URL}/crear`, funcionario)
    }

    editarFuncionario(funcionario: FuncionarioModel) : Observable<FuncionarioModel> {
        return this.http.put<FuncionarioModel>(`${this.API_URL}/editar/${funcionario._id}`, funcionario)
    }
    eliminarFuncionario(idFuncionario : string) : Observable<FuncionarioModel> {
        console.log(idFuncionario);
        return this.http.delete<FuncionarioModel>(`${this.API_URL}/eliminar/${idFuncionario}`);
    }
}