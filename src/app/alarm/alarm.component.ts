import { Component } from '@angular/core';
import { AppService } from 'src/app.service';
import { AlarmDto } from '../models/AlarmDto';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent {
  alarmValue: boolean = false;  
  private intervalSubscription: Subscription | undefined;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadAlarm();
    this.appService.SzafyChanged$.subscribe(() => {
      this.loadAlarm();
    });

    this.intervalSubscription = interval(3000).subscribe(() => {
      this.loadAlarm();
    });
  }
  
  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }


  loadAlarm(){
    this.appService.getAlarm().subscribe(
      (data: AlarmDto) => {
        this.alarmValue = data.aktywny;
      },
      (error: any) => {
        console.error('Error loading alarm', error);
      }
    );
  }

  onSzafyChange() {
    this.loadAlarm();
  }
}
