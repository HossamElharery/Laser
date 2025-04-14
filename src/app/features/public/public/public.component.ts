import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from "../../../layouts/main-layout/main-layout.component";

@Component({
  selector: 'app-public',
  imports: [RouterOutlet, MainLayoutComponent],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent {

}
