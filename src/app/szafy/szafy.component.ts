import { Component, OnInit, OnDestroy } from '@angular/core';
import { SzafaDto } from '../models/SzafaDto';
import { AppService } from 'src/app.service';
import { Subscription, interval} from 'rxjs';
import { DodajSzafaModel } from '../models/DodajSzafe';
import { EdytujSzafaModel } from '../models/EdytujSzafaModel';

@Component({
  selector: 'app-szafy',
  templateUrl: './szafy.component.html',
  styleUrls: ['./szafy.component.css']
})
export class SzafyComponent implements OnInit, OnDestroy {
  szafy: SzafaDto[] = [];
  intervalSubscription: Subscription | undefined;
  nowaSzafa: DodajSzafaModel = {
    temperatura1: 8,
    temperatura2: 8
  };
  edytowanaSzafa: EdytujSzafaModel | null = null;
  dodawanieSzafy: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadSzafy();
    this.intervalSubscription = interval(3000).subscribe(() => {
      this.loadSzafy();
    });
  }
  
  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  loadSzafy() {
    this.appService.getSzafy().subscribe(
      (data: SzafaDto[]) => {
        this.szafy = data;
      },
      (error: any) => {
        console.error('Error loading szafy', error);
      }
    );
  }

  dodajSzafe() {
    this.appService.createSzafa(this.nowaSzafa).subscribe(
      () => {
        this.loadSzafy();
        this.appService.emitSzafyChange();
      },
      (error) => {
        console.error('Błąd podczas dodawania szafy:', error);
      }
    );
  }

  edytujSzafe(id: number) {
    this.appService.getSzafaById(id).subscribe(
      (szafa) => {
        this.edytowanaSzafa = szafa;
      },
      (error) => {
        console.error('Błąd podczas pobierania danych do edycji szafy:', error);
      }
    );
  }

  zatwierdzEdycje(id: number) {
    if (this.edytowanaSzafa) {
      this.appService.updateSzafa(id, this.edytowanaSzafa).subscribe(
        () => {
          this.loadSzafy();
          this.edytowanaSzafa = null; 
          this.appService.emitSzafyChange()
        },
        (error) => {
          console.error('Błąd podczas edycji szafy:', error);
        }
      );
    }
  }

  anulujEdycje() {
    this.edytowanaSzafa = null;
  }

  usunSzafe(szafaId: number): void {
    this.appService.deleteSzafa(szafaId).subscribe(
      () => {
        this.loadSzafy();
        this.appService.emitSzafyChange();
      },
      (error) => {
        console.error('Błąd podczas usuwania szafy:', error);
      }
    );
  }
}
