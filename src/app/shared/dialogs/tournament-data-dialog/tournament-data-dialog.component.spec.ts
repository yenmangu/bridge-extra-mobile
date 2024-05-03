import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDataDialogComponent } from './tournament-data-dialog.component';

describe('TournamentDataDialogComponent', () => {
  let component: TournamentDataDialogComponent;
  let fixture: ComponentFixture<TournamentDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDataDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TournamentDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
