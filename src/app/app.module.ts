import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { HeaderComponent } from './header/header.component';
import { ToolsComponent } from './tools/tools.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTreeModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule } from '@angular/material';;
import { RefboxComponent } from './refbox/refbox.component'

import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent,
    HeaderComponent,

    ToolsComponent
    ,

    RefboxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
