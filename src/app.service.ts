import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SzafaDto } from './app/models/SzafaDto';
import { Subject } from 'rxjs';
import { DodajSzafaModel } from './app/models/DodajSzafe';
import { EdytujSzafaModel } from './app/models/EdytujSzafaModel';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'https://localhost:44326/api'; 
  private szafyChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  emitSzafyChange() {
    this.szafyChanged.next();
  }

  get SzafyChanged$() {
    return this.szafyChanged.asObservable();
  }

  getAlarm(): Observable<any> {
    return this.http.get(`${this.apiUrl}/alarm`);
  }

  getSzafy(): Observable<any> {
    return this.http.get(`${this.apiUrl}/szafa`);
  }

  getSzafaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/szafa/${id}`);
  }

  updateSzafa(id: number, data: EdytujSzafaModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/szafa/${id}`, data);
  }

  deleteSzafa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/szafa/${id}`);
  }

  createSzafa(nowaSzafa: DodajSzafaModel): Observable<DodajSzafaModel> {
    return this.http.post<DodajSzafaModel>(`${this.apiUrl}/szafa`, nowaSzafa);
  }
}
