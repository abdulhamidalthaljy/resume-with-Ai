import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConverterComponent } from './content-converter.component';

describe('ContentConverterComponent', () => {
  let component: ContentConverterComponent;
  let fixture: ComponentFixture<ContentConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
