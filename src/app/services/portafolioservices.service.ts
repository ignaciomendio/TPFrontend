import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Persona} from '../Models/Persona';
import { Experiencia } from '../Models/Experiencia';
import { Educacion } from '../Models/Educacion';
import { Proyecto } from '../Models/Proyecto';
import { Observable } from 'rxjs';
import { Skill } from '../Models/Skill';

@Injectable({
  providedIn: 'root'
})

export class PortafolioservicesService {

  private URLBkEnd: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getPersonaData():Observable<Persona[]> {

      return this.http.get<Persona[]>(this.URLBkEnd + 'api/persona/listar');
  }

  editPersonaData(id: number, per: Persona):Observable<any> {
      return this.http.post(this.URLBkEnd + 'api/persona/actualizar/' + id, per);
  }

  getExperienciaData(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.URLBkEnd + 'api/experiencia/listar');
  }

  editExperienciaData(id: number, exp: Experiencia): Observable<any>{
    return this.http.post (this.URLBkEnd + 'api/experiencia/actualizar/' + id, exp);
  }

  deleteExperienciaData(id: number): Observable<any>{
    return this.http.delete(this.URLBkEnd + 'api/experiencia/eliminar/' + id);
  }

  addExperienciaData(exp: Experiencia): Observable<any>{
    return this.http.post(this.URLBkEnd + 'api/experiencia/agregar', exp);
  }

  getEducacionData(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.URLBkEnd + 'api/educacion/listar');
  }

  editEducacionData(id: number, ed: Educacion): Observable<any>{
    return this.http.post (this.URLBkEnd + 'api/educacion/actualizar/' + id, ed);
  }

  deleteEducacionData(id: number): Observable<any>{
    return this.http.delete(this.URLBkEnd + 'api/educacion/eliminar/' + id);
  }

  addEducacionData(ed: Educacion): Observable<any>{
    return this.http.post(this.URLBkEnd + 'api/educacion/agregar', ed);
  }

  getProyectoData(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.URLBkEnd + 'api/proyectos/listar');
  }

  editProyectoData(id: number, pr: Proyecto): Observable<any>{
    return this.http.post (this.URLBkEnd + 'api/proyectos/actualizar/' + id, pr);
  }

  deleteProyectoData(id: number): Observable<any>{
    return this.http.delete(this.URLBkEnd + 'api/proyectos/eliminar/' + id);
  }

  addProyectoData(ed: Proyecto): Observable<any>{
    return this.http.post(this.URLBkEnd + 'api/proyectos/agregar', ed);
  }

  getSkillData(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.URLBkEnd + 'api/tecnologia/listar');
  }

  deleteSkillData(id: number): Observable<any>{
    return this.http.delete(this.URLBkEnd + 'api/tecnologia/eliminar/' + id);
  }

  addSkillData(sk: Skill): Observable<any>{
    return this.http.post(this.URLBkEnd + 'api/tecnologia/agregar', sk);
  }

}
