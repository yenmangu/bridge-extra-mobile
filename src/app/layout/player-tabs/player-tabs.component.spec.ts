import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTabsComponent } from './player-tabs.component';

describe('PlayerTabsComponent', () => {
  let component: PlayerTabsComponent;
  let fixture: ComponentFixture<PlayerTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
