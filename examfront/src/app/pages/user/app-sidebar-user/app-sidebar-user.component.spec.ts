import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidebarUserComponent } from './app-sidebar-user.component';

describe('AppSidebarUserComponent', () => {
  let component: AppSidebarUserComponent;
  let fixture: ComponentFixture<AppSidebarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSidebarUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSidebarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
