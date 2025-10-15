import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PerformanceDTO } from '../../dto/PerfomanceDto';

@Component({
  selector: 'app-performance-modal',
  templateUrl: './performance-modal.component.html',
  styleUrls: ['./performance-modal.component.css']
})
export class PerformanceModalComponent implements OnInit, OnDestroy {
  @Input() isVisible: boolean = false;
  @Input() performance: PerformanceDTO = {} as PerformanceDTO;
  @Input() mode: 'edit' | 'delete' = 'edit'; 

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<PerformanceDTO>();
  @Output() delete = new EventEmitter<number>();

  private originalOverflow: string = '';

  constructor() {}

  ngOnInit(): void {
    // Store original body overflow to restore it later
    if (typeof document !== 'undefined') {
      this.originalOverflow = document.body.style.overflow;
    }
  }

  ngOnDestroy(): void {
    // Restore original body overflow when component is destroyed
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.originalOverflow;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isVisible) {
      this.closeModal();
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (this.isVisible && (event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  onSave(): void {
    this.save.emit(this.performance);
  }

  onDelete(): void {
    if (this.performance.performanceId) {
      this.delete.emit(this.performance.performanceId);
    }
  }

  closeModal(): void {
    this.isVisible = false;
    this.close.emit();
  }
}
