import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { HeaderComponent } from './header/header.component';
import { ToolsComponent } from './tools/tools.component';
  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  ;
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent,
    HeaderComponent,
    
    ToolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
  MatButtonModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
