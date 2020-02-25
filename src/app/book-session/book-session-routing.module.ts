import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookSessionPage } from './book-session.page';

const routes: Routes = [
  {
    path: '',
    component: BookSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookSessionPageRoutingModule {}
