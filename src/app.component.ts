import { Component, inject } from '@angular/core';
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

  // Expose signals for template
  config = this.presentationService.config;
  slides = this.presentationService.slides;
  currentSlide = this.presentationService.currentSlide;
  currentSlideIndex = this.presentationService.currentSlideIndex;
  isGeneratingOutline = this.presentationService.isGeneratingOutline;

  // Local UI state
  showEditor = false;

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