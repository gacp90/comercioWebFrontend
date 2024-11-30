import { Component, OnInit } from '@angular/core';

declare function smoothFunction(): any;
declare function themeJs(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'comercioWebFrontend';

  ngOnInit(): void {
    smoothFunction();
    themeJs();
  }
}
