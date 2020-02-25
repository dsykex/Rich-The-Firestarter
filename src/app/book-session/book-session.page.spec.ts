import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookSessionPage } from './book-session.page';

describe('BookSessionPage', () => {
  let component: BookSessionPage;
  let fixture: ComponentFixture<BookSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
