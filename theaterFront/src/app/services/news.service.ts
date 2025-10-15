import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsDto } from '../dto/NewsDto';
import { isPlatformBrowser } from '@angular/common';

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
  private apiUrl = '/api/news';
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  private getAuthHeaders(): HttpHeaders {
    if (!isPlatformBrowser(this.platformId)) {
      return new HttpHeaders();
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      return headers;
    }
    return new HttpHeaders();
  }

  getNews(): Observable<News[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<News[]>(this.apiUrl, { headers });
  }

  createNews(newsData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, newsData, { headers });
  }

  getNewsById(id: string): Observable<News> {
    const headers = this.getAuthHeaders();
    return this.http.get<News>(`${this.apiUrl}/${id}`, { headers });
  }

  updateNews(id: number, newsData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, newsData, { headers });
  }

  deleteNews(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
