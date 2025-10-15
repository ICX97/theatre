import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { News } from '../../services/news.service';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css']
})
export class NewsModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() news: News | null = null;
  @Input() mode: 'edit' | 'delete' = 'edit';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<News>();
  @Output() delete = new EventEmitter<number>();

  editNews: News = {} as News;
  selectedFile: File | null = null;

  ngOnInit() {
    if (this.news) {
      this.editNews = { ...this.news };
    }
  }

  ngOnChanges() {
    if (this.news) {
      this.editNews = { ...this.news };
    }
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSave() {
    if (this.selectedFile) {
      (this.editNews as any).newsImage = this.selectedFile;
    }
    this.save.emit(this.editNews);
    this.closeModal();
  }

  onDelete() {
    if (this.news?.newsId) {
      this.delete.emit(this.news.newsId);
    }
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
    this.selectedFile = null;
  }

  get modalTitle(): string {
    return this.mode === 'edit' ? 'Edit News' : 'Delete News';
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  get isDeleteMode(): boolean {
    return this.mode === 'delete';
  }
}