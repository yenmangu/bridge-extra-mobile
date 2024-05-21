import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldPlayerDataComponent } from './old-player-data.component';

describe('OldPlayerDataComponent', () => {
  let component: OldPlayerDataComponent;
  let fixture: ComponentFixture<OldPlayerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldPlayerDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OldPlayerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
