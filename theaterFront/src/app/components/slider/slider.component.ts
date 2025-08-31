import { Component, OnInit, HostListener } from '@angular/core';
import { NewsService, News } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slides: News[] = []; // Ovde čuvamo vesti
  currentSlide = 0;
  
  // Drag properties
  isDragging = false;
  startX = 0;
  currentX = 0;
  dragThreshold = 50; // Minimum drag distance to trigger slide change
  dragOffset = 0; // Current drag offset for smooth movement

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.loadSlides();
  }

  loadSlides(): void {
    this.newsService.getNews().subscribe(data => {
      this.slides = data
        .sort((a, b) => {
          const dateA = new Date(a.newsDate);
          const dateB = new Date(b.newsDate);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 3);
    });
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  onSlideClick(slide: News): void {
    // Only navigate if not dragging and if the click is on the text container
    if (!this.isDragging) {
      this.router.navigate(['/single-news', slide.newsId]);
    }
  }

  getImageSrc(imageData: string | null): string {
    if (imageData) {
      return 'data:image/jpeg;base64,' + imageData;
    } else {
      return 'assets/images/defaultBlack.jpg';
    }
  }

  // Get transform for smooth drag
  getSlideTransform(index: number): string {
    if (!this.isDragging) {
      return '';
    }
    
    const slideWidth = 100; // 100% width
    const offset = this.dragOffset / window.innerWidth * 100; // Convert to percentage
    
    if (index === this.currentSlide) {
      return `translateX(${offset}%)`;
    } else if (index === this.currentSlide - 1 || (this.currentSlide === 0 && index === this.slides.length - 1)) {
      // Previous slide
      return `translateX(${offset - slideWidth}%)`;
    } else if (index === this.currentSlide + 1 || (this.currentSlide === this.slides.length - 1 && index === 0)) {
      // Next slide
      return `translateX(${offset + slideWidth}%)`;
    }
    
    return '';
  }

  // Mouse events for drag
  onMouseDown(event: MouseEvent): void {
    this.startDrag(event.clientX);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.currentX = event.clientX;
      this.dragOffset = this.currentX - this.startX;
      this.updateSlidePositions();
    }
  }

  onMouseUp(): void {
    this.endDrag();
  }

  // Touch events for mobile drag
  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.startDrag(event.touches[0].clientX);
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (this.isDragging && event.touches.length === 1) {
      this.currentX = event.touches[0].clientX;
      this.dragOffset = this.currentX - this.startX;
      this.updateSlidePositions();
      event.preventDefault(); // Prevent scrolling while dragging
    }
  }

  onTouchEnd(): void {
    this.endDrag();
  }

  // Update slide positions during drag
  private updateSlidePositions(): void {
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
    slides.forEach((slide, index) => {
      const transform = this.getSlideTransform(index);
      if (transform) {
        slide.style.transform = transform;
        slide.style.transition = 'none'; // Disable transition during drag
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
      }
    });
  }

  // Drag logic
  private startDrag(startX: number): void {
    this.isDragging = true;
    this.startX = startX;
    this.currentX = startX;
    this.dragOffset = 0;
    
    // Add dragging class to slider
    const slider = document.querySelector('.slider') as HTMLElement;
    if (slider) {
      slider.classList.add('dragging');
    }
  }

  private endDrag(): void {
    if (!this.isDragging) return;

    const dragDistance = this.currentX - this.startX;
    
    // Re-enable transitions and reset positions
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
    slides.forEach((slide, index) => {
      slide.style.transition = 'all 0.3s ease';
      slide.style.transform = '';
      
      // Reset opacity and visibility based on current slide
      if (index === this.currentSlide) {
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
        slide.style.zIndex = '1';
      } else {
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.zIndex = '0';
      }
    });
    
    // Check if drag distance is enough to change slide
    if (Math.abs(dragDistance) > this.dragThreshold) {
      if (dragDistance > 0) {
        // Dragged right - go to previous slide
        this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
      } else {
        // Dragged left - go to next slide
        this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
      }
      
      // Update slide visibility after changing current slide
      setTimeout(() => {
        slides.forEach((slide, index) => {
          if (index === this.currentSlide) {
            slide.style.opacity = '1';
            slide.style.visibility = 'visible';
            slide.style.zIndex = '1';
          } else {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.style.zIndex = '0';
          }
        });
      }, 50);
    }
    
    this.isDragging = false;
    this.dragOffset = 0;
    
    // Remove dragging class from slider
    const slider = document.querySelector('.slider') as HTMLElement;
    if (slider) {
      slider.classList.remove('dragging');
    }
  }

  // Prevent context menu on right click
  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event): void {
    event.preventDefault();
  }
}
