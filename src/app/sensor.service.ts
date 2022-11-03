import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Sensor } from './sensor';
import { SensorsCount } from './sensorsCount';
import { SensorDTO } from './sensorDTO';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private sensorsURL = 'http://localhost:8080/sensors?page=';
  private countURL = 'http://localhost:8080/sensors/count';
  private searchURL = 'http://localhost:8080/sensors/';
  private deleteURL = 'http://localhost:8080/sensors/';
  private addURL = 'http://localhost:8080/sensors';
  private updateURL = 'http://localhost:8080/sensors/';
  private filteredCount = 'http://localhost:8080/sensors/filteredCount/';

  constructor(private http: HttpClient) { }

  getSensors(page: number): Observable<Sensor[]> {
    const headers = this.getAuthHeader();
    return this.http.get<Sensor[]>(this.sensorsURL + page, {headers: headers});
  }

  getSensorsCount(): Observable<SensorsCount> {
    const headers = this.getAuthHeader();
    return this.http.get<SensorsCount>(this.countURL, {headers: headers});
  }

  searchByKeyWord(page: number, keyword: string): Observable<Sensor[]> {
    const headers = this.getAuthHeader();
    return this.http.get<Sensor[]>(this.searchURL + keyword + "?page=" + page, {headers: headers});
  }

  getFilteredSensorCount(keyword: string): Observable<SensorsCount> {
    return this.http.get<SensorsCount>(this.filteredCount + keyword, {headers: this.getAuthHeader()});
  }

  deleteSensor(id: number): Observable<any> {
    return this.http.delete<any>(this.deleteURL + id, {headers: this.getAuthHeader()});
  }

  addSensor(sensor: SensorDTO): Observable<any> {
    return this.http.post<any>(this.addURL, sensor, {headers: this.getAuthHeader()});
  }

  updateSensor(id: number, sensor: SensorDTO): Observable<any> {
    return this.http.patch<any>(this.updateURL + id, sensor, {headers: this.getAuthHeader()});
  }

  private getAuthHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer_' + String(sessionStorage.getItem("jwtToken")));
  }

}
