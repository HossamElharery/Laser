import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, AfterViewInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../../../../../core/services/language.service';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  image: string;
}

interface SliderItem {
  id: number;
  title: string;
  content: string;
  date: string;
  readingTime: string;
  image: string;
}

@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit, OnDestroy, AfterViewInit {
  private languageService = inject(LanguageService);
  private destroy$ = new Subject<void>();
  currentLanguage = this.languageService.currentLanguage;

  blogPosts: BlogPost[] = [];
  currentPage = 1;
  totalPages = 4;
  sortOption = 'newest';

  // Slider related properties
  sliderItems: SliderItem[] = [];
  currentSlide = 0;
  slideInterval: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.languageService.language$
    .pipe(takeUntil(this.destroy$))
    .subscribe(lang => {
      this.currentLanguage = lang;
    });

    // Load blog posts regardless of platform
    this.loadBlogPosts();
    this.setupSlider();

    // Only start slideshow in the browser
    if (this.isBrowser) {
      // Use setTimeout to ensure this runs after hydration is complete
      setTimeout(() => {
        this.startSlideshow();
      }, 0);
    }
  }

  ngAfterViewInit(): void {
    // Fix background images after view is initialized (client-side only)
    if (this.isBrowser) {
      setTimeout(() => {
        this.applyBackgroundImages();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.stopSlideshow();
    }
  }

  // New method to apply background images properly
  applyBackgroundImages(): void {
    const slides = document.querySelectorAll('.hero-slide');
    slides.forEach((slide, index) => {
      if (this.sliderItems[index]) {
        (slide as HTMLElement).style.backgroundImage = `url('${this.sliderItems[index].image}')`;
      }
    });
  }

  loadBlogPosts(): void {
    // Mock data for demonstration
    const posts: BlogPost[] = [];

    // Generate 12 blog posts
    for (let i = 1; i <= 12; i++) {
      posts.push({
        id: i,
        title: 'Blog Header Will be Here',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '20, June, 2023',
        readingTime: '10 Min Reading',
        image: '/assets/imgs/about/Frame 1618873351.png' // Using absolute path
      });
    }

    // Apply sorting
    if (this.sortOption === 'newest') {
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (this.sortOption === 'oldest') {
      posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    this.blogPosts = posts;
  }

  setupSlider(): void {
    this.sliderItems = [
      {
        id: 1,
        title: 'Blog Header Will be Here',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
        date: '20, June, 2023',
        readingTime: '10 Min Reading',
        image: '../../../../../../assets/imgs/blogs/Frame 1618873376.png' // Using absolute path
      },
      {
        id: 2,
        title: 'Another Blog Header Will be Here',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '15, June, 2023',
        readingTime: '8 Min Reading',
        image: '../../../../../../assets/imgs/about/Frame 1618873348.png' // Using absolute path
      },
      {
        id: 3,
        title: 'Third Blog Header Will be Here',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '10, June, 2023',
        readingTime: '12 Min Reading',
        image: '../../../../../../assets/imgs/blogs/Frame 1618873376.png' // Using absolute path

      }
    ];
  }

  startSlideshow(): void {
    if (!this.isBrowser) return;

    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopSlideshow(): void {
    if (!this.isBrowser) return;

    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    if (this.isBrowser) {
      this.resetSlideshow();
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.sliderItems.length;
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.sliderItems.length) % this.sliderItems.length;
  }

  resetSlideshow(): void {
    if (!this.isBrowser) return;

    this.stopSlideshow();
    this.startSlideshow();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBlogPosts();
    }
  }

  changeSortOption(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOption = select.value;
    this.loadBlogPosts();
  }

  getPageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
