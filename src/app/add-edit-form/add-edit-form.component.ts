import { Component, OnInit } from '@angular/core';
import { Sensor } from '../sensor';
import { SensorService } from '../sensor.service';
import { SensorDTO } from '../sensorDTO';
import { Router } from '@angular/router';
import { SensorTableComponent } from '../sensor-table/sensor-table.component';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit {

  rangeFrom: number = 0;
  rangeTo: number = 0;

  name?: string;
  model?: string;
  type?: string;
  unit?: string;
  location?: string;
  description?: string;

  err: boolean = false;

  constructor(private sensorService: SensorService, private router: Router, private component: SensorTableComponent) { }

  ngOnInit(): void {
  }

  save() {
    if(this.name === undefined || this.model === undefined || this.type === undefined || this.unit === undefined) {
      this.err = true;
    } else {
      let sensor = new SensorDTO(this.name, this.model, this.type, String(this.rangeFrom), String(this.rangeTo), this.unit, String(this.location), String(this.description)); 
      let id = sessionStorage.getItem("currentId");
      if(id === null) {
        this.sensorService.addSensor(sensor).subscribe(() => {
          this.component.getSensors();
        });
      } else {
        this.sensorService.updateSensor(Number(id), sensor).subscribe(() => {
          this.component.getSensors();
        });
        sessionStorage.removeItem("currentId");
      }
      sessionStorage.setItem("update", "true");
      this.router.navigateByUrl('/sensors');
    }
  }

  cancel() {
    sessionStorage.removeItem("currentId");
    this.router.navigateByUrl('/sensors');
  }

  increaseRangeFrom() {
    this.rangeFrom++;
  }

  descreaseRangeFrom() {
    this.rangeFrom--;
  }

  increaseRangeTo() {
    this.rangeTo++;
  }

  decreaseRangeTo() {
    this.rangeTo--;
  }

}
