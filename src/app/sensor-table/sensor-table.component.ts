import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Sensor } from '../sensor';
import { SensorService } from '../sensor.service';
import { SensorsCount } from '../sensorsCount';
import { Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-sensor-table',
  templateUrl: './sensor-table.component.html',
  styleUrls: ['./sensor-table.component.css']
})
export class SensorTableComponent implements OnInit, OnChanges, DoCheck {

  page: number = 1;
  sensors?: any;
  total?: any;
  isAdmin: boolean = false;
  textForSearch?: string;

  constructor(private sensorService: SensorService, private router: Router) {}

  ngOnInit(): void {
    this.checkRole();
    this.getSensors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngDoCheck(): void {
    if(sessionStorage.getItem("update") != null) {
      this.getSensors();
      sessionStorage.removeItem("update");
    }
  }

  public getSensors() {
    this.sensorService.getSensors(this.page).subscribe((data: Sensor[]) => {
      this.sensors = data;
    })
    this.sensorService.getSensorsCount().subscribe((data: SensorsCount) => {
      this.total = data.count;
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    if(sessionStorage.getItem("search") === null) {
      this.getSensors();
    } else {
      this.search();
    }
  }

  private checkRole() {
    if(sessionStorage.getItem("role") === 'ROLE_Administrator') {
      this.isAdmin = true;
    }
  }

  search(): void {
    if(this.textForSearch === undefined || this.textForSearch === null || this.textForSearch === "") {
      sessionStorage.removeItem("search");
      this.getSensors();
    } else {
      this.sensorService.searchByKeyWord(this.page, String(this.textForSearch)).subscribe((data: Sensor[]) => {
        this.sensors = data;
      })
      this.sensorService.getFilteredSensorCount(this.textForSearch).subscribe((data: SensorsCount) => {
        this.total = data.count;
      })
      sessionStorage.setItem("search", "true");
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  goToAddSensorPage() {
    this.router.navigateByUrl('/sensor');
  }

  deleteSensor(id: number) {
    this.sensorService.deleteSensor(id).subscribe(() => {
      this.sensors = this.getSensors();
    });
  }

  updateSensor(id: number) {
    sessionStorage.setItem("currentId", String(id));
    this.router.navigateByUrl('/sensor');
  }

}
