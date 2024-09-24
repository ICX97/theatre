import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  slides = [
    { 
      image: 'assets/images/slide1.jpg',
      title: 'Vesti 1',
      description: 'Opis vesti 1'
    },
    { 
      image: 'assets/images/slide2.jpg',
      title: 'Vesti 2',
      description: 'Opis vesti 2'
    },
    { 
      image: 'assets/images/slide3.jpg',
      title: 'Vesti 3',
      description: 'Opis vesti 3'
    }
  ];

  currentSlide = 0;

  prevSlide() {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
  }
}
