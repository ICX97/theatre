import { Component, OnInit } from '@angular/core';
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

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.loadSlides();
  }

  loadSlides(): void {
    this.newsService.getNews().subscribe(data => {
      this.slides = data.slice(0, 3);
    });
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
  }

  onSlideClick(slide: News): void {
    this.router.navigate(['/single-news', slide.newsId]); // Rutiranje na pojedinačnu vest
  }

  getImageSrc(imageData: string | null): string {
    return imageData ? 'data:image/jpeg;base64,' + imageData : '';
  }
}
