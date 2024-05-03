import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailsTableComponent } from './tournament-details-table.component';

describe('TournamentDetailsTableComponent', () => {
  let component: TournamentDetailsTableComponent;
  let fixture: ComponentFixture<TournamentDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TournamentDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
