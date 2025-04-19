import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher/language-switcher.component';
import { HeroComponent } from './components/hero/hero.component';
import { ClinicsComponent } from "../clinics/clinics.component";
import { HomeClinicsComponent } from "./components/home-clinics/home-clinics.component";
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, LanguageSwitcherComponent, RouterModule, HeroComponent, HomeClinicsComponent , HowItWorksComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Features section data
  features: Feature[] = [
    {
      icon: 'icon-speed',
      title: 'Fast Performance',
      description: 'Our solutions are optimized for speed and efficiency'
    },
    {
      icon: 'icon-shield',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security for your peace of mind'
    },
    {
      icon: 'icon-mobile',
      title: 'Responsive Design',
      description: 'Perfect experience on any device or screen size'
    },
    {
      icon: 'icon-support',
      title: '24/7 Support',
      description: 'Our team is always ready to help when you need it'
    }
  ];

  // About section data
  aboutItems: string[] = [
    'Innovative technology solutions',
    'Professional and experienced team',
    'Customer satisfaction guaranteed',
    'Continuous improvement and updates'
  ];

  // Services section data
  services: Service[] = [
    {
      icon: 'icon-web',
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies'
    },
    {
      icon: 'icon-mobile',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android'
    },
    {
      icon: 'icon-cloud',
      title: 'Cloud Solutions',
      description: 'Scalable and reliable cloud infrastructure and deployment services'
    }
  ];

  constructor(
  ) {}

  ngOnInit(): void {
    // Remove logging to prevent console spam
    // translateService is already configured by the LanguageService
  }
}
