import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Actor } from '../../models/actor.model';

@Component({
  selector: 'app-actor-modal',
  templateUrl: './actor-modal.component.html',
  styleUrls: ['./actor-modal.component.css']
})
export class ActorModalComponent implements OnInit, OnDestroy {
  @Input() isVisible: boolean = false;
  @Input() actor: Actor = {} as Actor;
  @Input() mode: 'edit' | 'delete' = 'edit'; 

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Actor>();
  @Output() delete = new EventEmitter<number>();

  private originalOverflow: string = '';

  constructor() {}

  ngOnInit(): void {
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
    this.save.emit(this.actor);
  }

  onDelete(): void {
    if (this.actor.ensembleId) {
      this.delete.emit(this.actor.ensembleId);
    }
  }

  closeModal(): void {
    this.isVisible = false;
    this.close.emit();
  }
}
