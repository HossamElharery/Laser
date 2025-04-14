import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher/language-switcher.component';

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
  imports: [CommonModule, TranslateModule, LanguageSwitcherComponent,RouterModule],
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
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Current language:', this.translateService.currentLang);
  }

  onLanguageChange(lang: string): void {
    // Get current route path without language prefix
    const urlSegments = this.router.url.split('/');
    const pathWithoutLang = urlSegments.slice(2).join('/');

    // Navigate to same route with new language prefix
    this.router.navigate([`/${lang}/${pathWithoutLang}`]);
  }
}
