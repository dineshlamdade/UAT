import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, LeftmenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CollapseModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    LeftmenuComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedlayoutModule { }
