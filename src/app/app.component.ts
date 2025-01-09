import {AfterViewInit, Component, Inject, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Splide from '@splidejs/splide';
import {isPlatformBrowser} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'Watch Stars';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Initializing carousels...');
      setTimeout(() => {
        this.initCarousel('#splide-row-1', 7); // First carousel
        this.initCarousel('#splide-row-2', 12); // Second carousel
        this.initCarousel('#splide-row-3', 11); // Third carousel
      }, 0);
    }
  }

  private initCarousel(selector: string, perPage: number): void {
    // Ensure this only runs in the browser
    if (isPlatformBrowser(this.platformId)) {
      const splide = new Splide(selector, {
        type: 'slide',
        perPage: perPage,
        perMove: 1,
        trimSpace: true,
        autoplay: false,
        autoWidth: false,
        pagination: false,
        wheel: false,
        direction: 'ltr', // Ensure left to right movement
        padding: { left: '3.4%', right: '3.4%' },
      }).mount();

      console.log(splide); // Check if the splide instance is correctly initialized

      this.hideArrowsIfNeeded(splide);
      this.adjustSlideWidth(selector, perPage);
    }
  }

  // Helper function to adjust the width of slides dynamically
  private adjustSlideWidth(selector: string, perPage: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const list = document.querySelector(selector)?.querySelector('.splide__list');
      if (list) {
        const totalSlides = list.children.length;
        const slideWidth = totalSlides > perPage ? `calc(100% / ${perPage} - 20px)` : '100%';
        const slides = list.querySelectorAll('.splide__slide');
        slides.forEach((slide) => {
          (slide as HTMLElement).style.maxWidth = slideWidth;
        });
      }
    }
  }

  // Helper function to hide arrows if not enough slides
  private hideArrowsIfNeeded(splide: Splide): void {
    if (isPlatformBrowser(this.platformId)) {
      const totalSlides = splide.length;
      const visibleSlides = splide.options.perPage;

      // @ts-ignore
      if (totalSlides <= visibleSlides) {
        const arrows = splide.root.querySelector('.splide__arrows');
        if (arrows) (arrows as HTMLElement).style.display = 'none';
      }
    }
  }
}
