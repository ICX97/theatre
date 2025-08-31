import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsItems: News[] = [];

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.newsService.getNews().subscribe(data => {
      this.newsItems = data.sort((a, b) => {
        const dateA = new Date(a.newsDate);
        const dateB = new Date(b.newsDate);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  onNewsClick(newsItem: News): void {
    this.router.navigate(['/single-news', newsItem.newsId]);
  }

  getImageSrc(imageData: string | null): string {
    if (imageData) {
      return 'data:image/jpeg;base64,' + imageData;
    } else {
      return 'assets/images/defaultBlack.jpg';
    }
  }
}