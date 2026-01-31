import { Component, input, output, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Slide } from '../services/presentation.service';

@Component({
  selector: 'app-slide-renderer',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <!-- Slide Container: Clean White Card -->
    <div class="relative w-full aspect-video bg-white overflow-hidden flex flex-col text-slate-800">
      
      <!-- Top Bar: Minimal with Logo placeholder -->
      <div class="h-16 flex items-center justify-between px-12 pt-8">
        <div class="flex items-center gap-2">
           <div class="text-2xl font-black tracking-tight text-[#2D4B8E]">
             <span class="text-orange-500">I</span>NAMESA
           </div>
           <div class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
             Confidential
           </div>
        </div>
        
        <!-- Right Side: Logo (Internal) or Date (Title) -->
        @if (slide().layout !== 'title') {
           <img src="https://www.go360.dev/propuesta/inamesa/logo_go360_png.png" 
                class="max-h-[60px] max-w-[100px] object-contain" 
                alt="Go360 Logo">
        } @else {
           <div class="text-sm font-bold text-slate-400">{{ timestamp | date:'yyyy' }}</div>
        }
      </div>

      <!-- Slide Layouts -->
      @switch (slide().layout) {
        
        <!-- TITLE LAYOUT -->
        @case ('title') {
          <div class="flex-1 flex flex-col justify-center px-16 relative">
             <div class="uppercase text-sm font-bold text-[#2D4B8E] mb-6 tracking-widest">
                Propuesta Técnica
             </div>
             <h1 class="text-5xl font-extrabold text-slate-900 leading-tight mb-8 max-w-5xl">
               {{ slide().title }}
             </h1>
             <div class="w-32 h-2 bg-[#F97316] rounded-full mb-10"></div>
             
             <!-- Subtitle -->
             <div class="text-2xl text-slate-600 font-light max-w-4xl leading-relaxed">
               {{ slide().content[0] }}
             </div>

             <!-- Footer (Second line of content if available) -->
             @if (slide().content[1]) {
               <div class="absolute bottom-12 left-16 text-sm font-medium text-slate-400 flex items-center gap-3">
                 <div class="w-8 h-px bg-slate-300"></div>
                 {{ slide().content[1] }}
               </div>
             }
          </div>
        }

        <!-- CONTENT LAYOUT -->
        @case ('content') {
           <div class="flex-1 flex flex-col px-16 py-8">
             <div class="flex items-baseline justify-between border-b border-gray-100 pb-6 mb-8">
                <h2 class="text-4xl font-bold text-slate-900">{{ slide().title }}</h2>
             </div>

             <div class="flex-1">
                @if (slide().content.length === 0) {
                  <div class="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-400 font-medium">
                    No content generated yet
                  </div>
                } @else {
                  <div class="grid gap-6">
                    @for (point of slide().content; track point) {
                      <div class="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                         <div class="mt-1.5 w-3 h-3 rounded-full bg-[#10B981] flex-shrink-0 mr-4 shadow-sm"></div>
                         <p class="text-lg text-slate-700 font-medium leading-relaxed">{{ point }}</p>
                      </div>
                    }
                  </div>
                }
             </div>
           </div>
        }

        <!-- THREE COLUMN LAYOUT -->
        @case ('three-column') {
          <div class="flex-1 flex flex-col px-16 py-8">
             <div class="flex items-baseline justify-between border-b border-gray-100 pb-6 mb-8">
                <h2 class="text-4xl font-bold text-slate-900">{{ slide().title }}</h2>
             </div>

             @if (threeColumnData(); as data) {
               <div class="grid gap-6 flex-1" 
                    [class.grid-cols-3]="data.sections.length >= 3" 
                    [class.grid-cols-2]="data.sections.length === 2" 
                    [class.grid-cols-1]="data.sections.length === 1">
                 @for (section of data.sections; track section.title) {
                   <div class="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col hover:border-blue-200 transition-colors h-full">
                     
                     <!-- Standard List View -->
                     @if (section.points.length > 0) {
                         <h3 class="text-lg font-bold text-[#2D4B8E] mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide">
                           {{ section.title }}
                         </h3>
                         <ul class="space-y-3 flex-1">
                           @for (point of section.points; track point) {
                             <li class="flex items-start text-slate-700 text-sm leading-relaxed">
                               <span class="text-[#F97316] mr-2 font-bold">›</span>
                               <span>{{ point }}</span>
                             </li>
                           }
                         </ul>
                     } @else {
                        <!-- Featured Card View (No Points) -->
                        <div class="flex-1 flex flex-col items-center justify-center text-center p-4">
                           <div class="w-16 h-16 mb-4 rounded-full bg-blue-100 text-[#2D4B8E] flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                           </div>
                           <h3 class="text-xl font-bold text-[#2D4B8E] leading-tight">
                              {{ section.title }}
                           </h3>
                        </div>
                     }
                   </div>
                 }
               </div>

               @if (data.footer) {
                 <div class="mt-6 p-4 bg-[#2D4B8E]/5 border-l-4 border-[#2D4B8E] rounded-r-lg">
                   <p class="text-lg font-bold text-[#2D4B8E] flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     {{ data.footer }}
                   </p>
                 </div>
               }
             }
          </div>
        }

        <!-- COMPARISON LAYOUT (AS-IS vs TO-BE) -->
        @case ('comparison') {
          <div class="flex-1 flex flex-col px-16 py-8">
             <div class="flex items-baseline justify-between border-b border-gray-100 pb-6 mb-8">
                <h2 class="text-4xl font-bold text-slate-900">{{ slide().title }}</h2>
             </div>

             @if (comparisonData(); as data) {
               <div class="flex-1 grid grid-cols-2 gap-12 items-start relative">
                  <!-- Vertical Separator/Arrow -->
                  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-200 text-gray-400">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>

                  <!-- AS-IS (Left) -->
                  @if (data[0]) {
                    <div class="bg-gray-50 rounded-xl p-8 border border-gray-200 h-full flex flex-col">
                       <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                          <h3 class="text-2xl font-black text-slate-500 uppercase tracking-tight">{{ data[0].title }}</h3>
                          <span class="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded uppercase">Current</span>
                       </div>
                       <ul class="space-y-4">
                         @for (point of data[0].points; track point) {
                           <li class="flex items-start text-slate-600 font-medium">
                              <span class="text-gray-400 mr-3 mt-1">•</span>
                              {{ point }}
                           </li>
                         }
                       </ul>
                    </div>
                  }

                  <!-- TO-BE (Right) -->
                  @if (data[1]) {
                    <div class="bg-white rounded-xl p-8 border-2 border-[#2D4B8E]/20 shadow-xl shadow-blue-900/5 h-full flex flex-col relative overflow-hidden">
                       <div class="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-10 -mt-10"></div>
                       
                       <div class="flex items-center justify-between mb-6 pb-4 border-b border-blue-100 relative">
                          <h3 class="text-2xl font-black text-[#2D4B8E] uppercase tracking-tight">{{ data[1].title }}</h3>
                          <span class="px-3 py-1 bg-[#2D4B8E] text-white text-xs font-bold rounded uppercase">Future</span>
                       </div>
                       <ul class="space-y-4 relative">
                         @for (point of data[1].points; track point) {
                           <li class="flex items-start text-slate-800 font-medium">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#10B981] mr-3 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                              {{ point }}
                           </li>
                         }
                       </ul>
                    </div>
                  }
               </div>
             }
          </div>
        }

        <!-- AGENDA LAYOUT -->
        @case ('agenda') {
          <div class="flex-1 flex flex-col px-16 py-8">
             <h2 class="text-4xl font-bold text-[#2D4B8E] mb-12">Agenda</h2>
             
             <div class="grid grid-cols-2 gap-6">
                @for (item of slide().content; track item; let i = $index) {
                  <div class="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center">
                    <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-[#2D4B8E] font-bold text-lg mr-5 group-hover:bg-[#2D4B8E] group-hover:text-white transition-colors">
                      {{ i + 1 }}
                    </span>
                    <span class="text-xl font-bold text-slate-800">{{ item }}</span>
                  </div>
                }
                @if (slide().content.length === 0) {
                   <div class="col-span-2 text-center text-gray-400 py-10 bg-gray-50 rounded-xl">Agenda items will appear here</div>
                }
             </div>
          </div>
        }
        
        <!-- DEFAULT/CONCLUSION -->
        @default {
          <div class="flex-1 flex flex-col items-center justify-center bg-white">
            <h2 class="text-5xl font-extrabold text-slate-900 mb-6">{{ slide().title }}</h2>
            <div class="flex items-center gap-2">
               <div class="w-2 h-2 rounded-full bg-[#F97316]"></div>
               <div class="w-16 h-2 rounded-full bg-[#2D4B8E]"></div>
               <div class="w-2 h-2 rounded-full bg-[#F97316]"></div>
            </div>
            <div class="mt-8 text-slate-500 font-medium">Thank You</div>
          </div>
        }

      }

      <!-- Bottom Bar -->
      <div class="h-3 w-full bg-[#F97316]"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class SlideRendererComponent {
  slide = input.required<Slide>();
  timestamp = new Date();

  threeColumnData = computed(() => {
    const s = this.slide();
    if (s.layout !== 'three-column') return null;
    
    // Parse content for three-column layout
    // Expected format: "Title|Point 1|Point 2..."
    const sections = [];
    let footer = null;

    // We assume the first 3 items are the columns, and the 4th (if any) is the footer/impact statement
    const columnContent = s.content.length > 3 ? s.content.slice(0, 3) : s.content;
    
    sections.push(...columnContent.map(str => {
      const parts = str.split('|');
      return { 
        title: parts[0] || 'Untitled', 
        points: parts.slice(1) 
      };
    }));

    if (s.content.length > 3) {
      footer = s.content[3];
    }

    return { sections, footer };
  });

  comparisonData = computed(() => {
    const s = this.slide();
    if (s.layout !== 'comparison') return null;

    return s.content.map(str => {
      const parts = str.split('|');
      return {
        title: parts[0],
        points: parts.slice(1)
      };
    });
  });
}