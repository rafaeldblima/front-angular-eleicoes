import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoModalComponent } from './partido-modal.component';

describe('PartidoModalComponent', () => {
  let component: PartidoModalComponent;
  let fixture: ComponentFixture<PartidoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
