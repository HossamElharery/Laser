import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.scss',
  imports: [RouterOutlet],
  standalone: true
})
export class ProfileLayoutComponent {}
