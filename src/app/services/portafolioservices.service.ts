import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Persona} from '../Models/Persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortafolioservicesService {

  constructor(private http: HttpClient) { }

  getPersonaData():Observable<Persona[]> {

      return this.http.get<Persona[]>('http://localhost:8080/api/persona/listar');
  }

  editPersonaData(id: number, per: Persona):Observable<any> {
      return this.http.post('http://localhost:8080/api/persona/actualizar/' + id, per);
  }

}
