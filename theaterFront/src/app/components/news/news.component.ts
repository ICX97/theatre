import { Component } from '@angular/core';

interface NewsItem {
  title: string;
  date: Date;
  shortDescription: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  newsItems: NewsItem[] = [
    { title: 'Naslov 1', date: new Date(), shortDescription: 'Kratak opis 1' },
    { title: 'Naslov 2', date: new Date(), shortDescription: 'Kratak opis 2' },
    { title: 'Naslov 3', date: new Date(), shortDescription: 'Kratak opis 3' },
    { title: 'Naslov 4', date: new Date(), shortDescription: 'Kratak opis 4' },
    { title: 'Naslov 5', date: new Date(), shortDescription: 'Kratak opis 5' },
    { title: 'Naslov 6', date: new Date(), shortDescription: 'Kratak opis 6' }
  ];

  onNewsClick(newsItem: NewsItem) {
    console.log(`Clicked on: ${newsItem.title}`);
  }
}
