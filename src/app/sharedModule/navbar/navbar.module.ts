import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatListModule} from '@angular/material/list'
import {MatMenuModule} from '@angular/material/menu'
import { FlexLayoutModule } from '@angular/flex-layout';




@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    // MatButtonModule,
     MatIconModule,
    // MatSnackBarModule,
    // MatDividerModule,
    // MatListModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  exports:[
    NavbarComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule
  ]
})
export class NavbarModule { }
