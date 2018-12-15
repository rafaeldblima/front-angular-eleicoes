import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartidoModel } from './partido.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  private serverUrl = 'http://localhost:5000/api/partidos';
  public updateList = new Subject();

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get<PartidoModel[]>(this.serverUrl);
  }

  create(partido: PartidoModel) {
    return this.httpClient.post(this.serverUrl, partido);
  }

  getById(id: number) {
    return this.httpClient.get<PartidoModel>(`${this.serverUrl}/${id}`);
  }

  update(partido: PartidoModel) {
    return this.httpClient.put(`${this.serverUrl}/${partido.id}`, partido);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.serverUrl}/${id}`);
  }

}
