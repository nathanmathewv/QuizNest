import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../module/shared/shared.module';
import FontFaceObserver from 'fontfaceobserver';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  load: boolean = false;

  ngOnInit(): void {
    const font = new FontFaceObserver('Material Icons');
    font.load().then(() => {
      this.load = true;
    });
  }
}
