import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SzafyComponent } from './szafy/szafy.component';
import { FormsModule } from '@angular/forms';
import { AlarmComponent } from './alarm/alarm.component';
@NgModule({
  declarations: [
    AppComponent,
    SzafyComponent,
    AlarmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
