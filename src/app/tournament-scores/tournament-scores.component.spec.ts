import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentScoresComponent } from './tournament-scores.component';

describe('TournamentScoresComponent', () => {
  let component: TournamentScoresComponent;
  let fixture: ComponentFixture<TournamentScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentScoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TournamentScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
