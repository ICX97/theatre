import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, News } from '../../services/news.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent implements OnInit {
  newsItem!: News; // Koristimo "!" da označimo da će biti inicijalizovana

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('newsId'); // Koristite 'newsId'
    if (id) {
      this.loadNewsItem(id);
    }
  }

  loadNewsItem(id: string): void {
    this.newsService.getNewsById(id).subscribe(data => {
      this.newsItem = data;
    });
  }

  getImageSrc(imageData: string | null): string {
    return imageData ? 'data:image/jpeg;base64,' + imageData : '';
  }
}
