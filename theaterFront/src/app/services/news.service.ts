import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsDto } from '../dto/NewsDto';

export interface News {
  newsId: number;
  newsTitle: string;
  newsDate: string;  
  newsDescription: string;
  newsImage: string | null;  
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = '/api/news';  // Adjust the URL according to your backend

  constructor(private http: HttpClient) {}

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  createNews(newsData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, newsData);
  }

  getNewsById(id: string): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${id}`);
  }
}