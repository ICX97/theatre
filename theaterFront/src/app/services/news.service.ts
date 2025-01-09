import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
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
  constructor(private http: HttpClient) {
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
    return new HttpHeaders();
  }

  getNews(): Observable<News[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<News[]>(this.apiUrl, { headers });
  }

  createNews(newsData: FormData): Observable<any> {
//     const headers = this.getAuthHeaders();
//     return this.http.post<any>(this.apiUrl, newsData, { headers });
      return this.http.post<any>(this.apiUrl, newsData);
  }

  getNewsById(id: string): Observable<News> {
    const headers = this.getAuthHeaders();
    return this.http.get<News>(`${this.apiUrl}/${id}`, { headers });
  }
}
