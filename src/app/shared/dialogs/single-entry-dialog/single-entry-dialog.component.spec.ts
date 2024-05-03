import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEntryDialogComponent } from './single-entry-dialog.component';

describe('SingleEntryDialogComponent', () => {
  let component: SingleEntryDialogComponent;
  let fixture: ComponentFixture<SingleEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleEntryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
