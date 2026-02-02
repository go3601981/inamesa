import { Component, inject, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresentationService } from './services/presentation.service';
import { SlideRendererComponent } from './components/slide-renderer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, SlideRendererComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  presentationService = inject(PresentationService);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  // Expose signals for template
  config = this.presentationService.config;
  slides = this.presentationService.slides;
  currentSlide = this.presentationService.currentSlide;
  currentSlideIndex = this.presentationService.currentSlideIndex;
  isGeneratingOutline = this.presentationService.isGeneratingOutline;

  // Local UI state
  showEditor = false;

  constructor() {
    effect(() => {
      // Track index changes
      const idx = this.currentSlideIndex();
      
      // Reset scroll whenever the index changes
      // We use a small timeout to ensure the DOM might have updated or just to break the sync stack slightly if needed,
      // but usually synchronous reset is fine.
      if (this.scrollContainer && this.scrollContainer.nativeElement) {
        this.scrollContainer.nativeElement.scrollTop = 0;
      }
    });
  }

  toggleEditMode() {
    this.showEditor = !this.showEditor;
  }

  onGenerateOutline() {
    this.presentationService.generateOutline();
  }

  onGenerateContent() {
    const slide = this.currentSlide();
    if (slide) {
      this.presentationService.generateContentForSlide(slide.id);
    }
  }

  onSelectSlide(index: number) {
    this.presentationService.selectSlide(index);
  }

  onAddSlide() {
    this.presentationService.addSlide();
  }

  onRemoveSlide(id: string, event: Event) {
    event.stopPropagation();
    if (confirm('Delete this slide?')) {
      this.presentationService.removeSlide(id);
      // Close editor if open to avoid stale state
      this.showEditor = false; 
    }
  }
}