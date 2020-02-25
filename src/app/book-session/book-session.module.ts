import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookSessionPageRoutingModule } from './book-session-routing.module';

import { BookSessionPage } from './book-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookSessionPageRoutingModule
  ],
  declarations: [BookSessionPage]
})
export class BookSessionPageModule {}
