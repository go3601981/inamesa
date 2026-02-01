import { Injectable, signal, computed, inject } from '@angular/core';
import { GeminiService } from './gemini.service';

export interface Slide {
  id: string;
  title: string;
  layout: 'title' | 'content' | 'agenda' | 'conclusion' | 'three-column' | 'comparison';
  content: string[];
  isGenerating?: boolean;
}

export interface PresentationConfig {
  client: string;
  language: string;
  tone: string;
  format: string;
}

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  private geminiService = inject(GeminiService);

  // Default Initial State as per User Prompt
  config = signal<PresentationConfig>({
    client: 'INAMESA',
    language: 'Spanish',
    tone: 'Industrial, Sobrio, Profesional',
    format: '16:9'
  });

  // Initial specific slide structure for INAMESA
  slides = signal<Slide[]>([
    {
      id: 's1',
      title: 'Propuesta Integral de Transformación Digital para INAMESA',
      layout: 'title',
      content: [
        'Optimización operativa, control en tiempo real y habilitadores comerciales',
        'Presentado por Go360 – 2026'
      ]
    },
    {
      id: 's2',
      title: 'Qué entendimos de su operación',
      layout: 'content',
      content: [
        'Uso de guías físicas para despachos.',
        'Firmas presenciales que generan demoras.',
        'La venta ocurre con normalidad, el problema aparece en el despacho.',
        'Registro de entregas realizado de forma diferida.',
        'Poca visibilidad del estado real de los pedidos.',
        'Oportunidad clara de digitalización operativa.'
      ]
    },
    {
      id: 's3',
      title: 'Dónde se pierde tiempo y control',
      layout: 'three-column',
      content: [
        'Comercial|Venta se concreta, pero se detiene en despacho.|Dependencia de aprobaciones manuales.',
        'Operaciones|Guías físicas y traslados internos.|Pedidos acumulados sin priorización clara.',
        'Logística|Cierre de entregas al final del día o al día siguiente.|Falta de información en tiempo real.',
        'Impacto: demoras, reprocesos y menor control operativo.'
      ]
    },
    {
      id: 's4',
      title: 'Proceso actual vs proceso propuesto',
      layout: 'comparison',
      content: [
        'Situación Actual|Guías físicas con firma presencial.|Despachos gestionados manualmente.|Registro de entrega diferido.|Información fragmentada.',
        'Situación Futura|Guías digitales con firma interna.|Cola y agenda de despachos visible.|Cierre de entrega en campo.|Información centralizada en tiempo real.'
      ]
    },
    {
      id: 's5',
      title: 'Solución base (núcleo operativo)',
      layout: 'three-column',
      content: [
        'Guías digitales con firma interna',
        'Cola y agenda de despachos',
        'Guía digital para chofer',
        'Esta solución resuelve el cuello operativo principal sin depender de inteligencia artificial.'
      ]
    },
    {
      id: 's6',
      title: 'Módulo: Guías digitales con firma interna',
      layout: 'three-column',
      content: [
        'Objetivo|Digitalizar la emisión y aprobación de guías de remisión.',
        'Funcionalidades Clave|Emisión digital de guías.|Roles y permisos.|Workflow de aprobación.|Firma digital interna.|Auditoría y trazabilidad.|Descarga e impresión validada.',
        'Resultado Operativo|Menor tiempo administrativo y mayor control documental.'
      ]
    },
    {
      id: 's7',
      title: 'Módulo: Cola y agenda de despachos',
      layout: 'three-column',
      content: [
        'Objetivo|Ordenar y priorizar los despachos de forma visible y controlada.',
        'Funcionalidades clave|Cola centralizada de pedidos.|Estados del despacho.|Priorización manual o automática.|Asignación a vehículos.|Agenda diaria y semanal.|Visualización operativa.',
        'Resultado operativo|Reducción de cuellos de botella y mejor coordinación interna.'
      ]
    },
    {
      id: 's8',
      title: 'Módulo: Guía digital para chofer',
      layout: 'three-column',
      content: [
        'Objetivo|Registrar y cerrar las entregas en el momento en que ocurren.',
        'Funcionalidades clave|Acceso móvil a entregas asignadas.|Visualización de la guía digital.|Firma del cliente receptor.|Registro en tiempo real.|Funcionamiento con o sin conexión.|Sincronización automática.',
        'Resultado operativo|Eliminación del registro diferido y mayor visibilidad.'
      ]
    },
    {
      id: 's9',
      title: 'Resultados esperados y KPIs',
      layout: 'three-column',
      content: [
        'Resultados esperados|Reducción de tiempos administrativos.|Mayor orden en despachos.|Información en tiempo real.|Menor reproceso.|Mejor coordinación entre áreas.',
        'KPIs sugeridos|Tiempo promedio de aprobación de guías.|Tiempo desde venta hasta despacho.|% de despachos cerrados en tiempo real.|% de guías con trazabilidad completa.|Número de reprocesos.'
      ]
    },
    {
      id: 's10',
      title: 'Escalabilidad: Visualización de productos en 3D y AR',
      layout: 'three-column',
      content: [
        'Visualización Interactiva|Visualización de productos en 3D desde la web.|Rotación 360°, zoom y visualización detallada.',
        'Realidad Aumentada (AR)|Botón para ver el producto en el espacio real.|Herramienta de alto impacto para visitas comerciales y web.',
        'Diferenciador Clave (Go360)|Contamos con un administrador interno ya desarrollado.|Carga directa de modelos 3D.|Reducción drástica de costos y tiempos.'
      ]
    },
    {
      id: 's11',
      title: 'Servicio recurrente: contenido para LinkedIn y X',
      layout: 'three-column',
      content: [
        'Volumen Semanal|4 publicaciones por semana en total.|2 publicaciones semanales en LinkedIn.|2 publicaciones semanales en X.',
        'Gestión Editorial|Calendario editorial mensual.|Redacción y publicación desde cuentas oficiales.',
        'Alcance del Servicio|Servicio de contenido y posteo.|No incluye gestión de mensajes.|No incluye pauta pagada.'
      ]
    },
    {
      id: 's12',
      title: 'Plan de implementación por fases',
      layout: 'three-column',
      content: [
        'Fase 1 – Núcleo Operativo|Guías digitales|Cola de despachos|Guía para chofer',
        'Fase 2 – Optimización|Ajustes por feedback|Dashboards|Estabilización operativa',
        'Fase 3 – Crecimiento|3D y AR|Herramientas comerciales|Contenido en redes',
        'Cada fase se construye sobre la anterior.'
      ]
    },
    {
      id: 's13',
      title: 'Tecnología y arquitectura (alto nivel)',
      layout: 'content',
      content: [
        'Aplicación web operativa.',
        'Aplicación web móvil para choferes.',
        'Backend centralizado con APIs.',
        'Base de datos con trazabilidad.',
        'Módulos independientes para 3D/AR y futuras extensiones.'
      ]
    },
    {
      id: 's14',
      title: 'Fase 1 – Núcleo Operativo Digital',
      layout: 'three-column',
      content: [
        'Alcance técnico|Sistema de guías digitales con firma interna.|Sistema de cola y agenda de despachos.|Guía digital para chofer con cierre de entrega en tiempo real.|Roles, permisos y trazabilidad operativa.|Dashboard operativo básico.',
        'Qué resuelve|Eliminación de papel y firmas presenciales.|Reducción de tiempos administrativos.|Control y visibilidad del proceso de despacho.|Registro inmediato de entregas.',
        'Tiempos e Inversión|Tiempo estimado: 12 a 16 semanas de implementación.|Inversión estimada: USD 27,430 (no incluye IGV).',
        'Esta fase es la base obligatoria sobre la cual se construyen las siguientes.'
      ]
    },
    {
      id: 's14b',
      title: 'Fase 2 – Optimización Operativa',
      layout: 'three-column',
      content: [
        'Alcance técnico|Sistema de conteo asistido con inteligencia artificial.|Aplicación móvil de captura para inventarios.|Conteo de tubos y varillas.|Validación manual asistida.|Registro histórico de conteos.|Fase piloto con calibración en campo.',
        'Consideraciones|Orientado a reducción de tiempo y error humano.|No se garantiza exactitud total en materiales muy delgados.|No incluye integración con ERP.',
        'Tiempos e Inversión|Tiempo estimado: 8 a 10 semanas de implementación.|Inversión estimada: USD 13,650 (no incluye IGV).',
        'Esta fase es opcional y se recomienda ejecutar después de estabilizar la Fase 1.'
      ]
    },
    {
      id: 's14c',
      title: 'Fase 3 – Crecimiento Comercial y Posicionamiento',
      layout: 'three-column',
      content: [
        'Alcance técnico|Visualización de productos en 3D desde la web.|Realidad aumentada para visualización en tamaño real.|Uso del administrador interno de modelos 3D ya desarrollado.|Kit digital para vendedores.|Activación de herramientas comerciales visuales.',
        'Beneficio principal|Mejora en la comprensión técnica del producto.|Soporte visual para ventas B2B.|Diferenciación comercial frente a competidores.',
        'Tiempos, Inversión y Recurrencia|Tiempo estimado: 6 a 8 semanas (según cantidad productos 3D).|Inversión One-time: USD 8,710 (no incluye IGV).|Servicio Recurrente Opcional (LinkedIn y X):|4 publicaciones semanales.|Fee mensual: USD 600 (no incluye IGV).',
        'Esta fase potencia el crecimiento comercial sobre una operación ya digitalizada.'
      ]
    },
    {
      id: 's15',
      title: 'Próximos pasos',
      layout: 'three-column',
      content: [
        '1. Taller de levantamiento de procesos actuales',
        '2. Definición del alcance de la Fase 1',
        '3. Inicio de implementación con entregas progresivas',
        'Recomendamos iniciar por el núcleo operativo y escalar según resultados.'
      ]
    }
  ]);

  currentSlideIndex = signal(0);
  
  currentSlide = computed(() => {
    const idx = this.currentSlideIndex();
    const all = this.slides();
    return all[idx] || null;
  });

  isGeneratingOutline = signal(false);

  updateConfig(newConfig: Partial<PresentationConfig>) {
    this.config.update(c => ({ ...c, ...newConfig }));
  }

  selectSlide(index: number) {
    if (index >= 0 && index < this.slides().length) {
      this.currentSlideIndex.set(index);
    }
  }

  addSlide(slide: Partial<Slide> = {}) {
    const newSlide: Slide = {
      id: crypto.randomUUID(),
      title: slide.title || 'Nueva Diapositiva',
      layout: slide.layout || 'content',
      content: slide.content || []
    };
    this.slides.update(s => [...s, newSlide]);
    this.currentSlideIndex.set(this.slides().length - 1);
  }

  updateSlide(id: string, updates: Partial<Slide>) {
    this.slides.update(slides => 
      slides.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  }

  removeSlide(id: string) {
    this.slides.update(slides => slides.filter(s => s.id !== id));
    if (this.currentSlideIndex() >= this.slides().length) {
      this.currentSlideIndex.set(Math.max(0, this.slides().length - 1));
    }
  }

  async generateOutline() {
    this.isGeneratingOutline.set(true);
    const { client, tone, language } = this.config();
    
    try {
      const outline = await this.geminiService.generateOutline(client, tone, language);
      
      const newSlides: Slide[] = outline.map((item: any) => ({
        id: crypto.randomUUID(),
        title: item.title,
        layout: item.layout || 'content',
        content: [] // Explicitly empty as per "Do not add content yet"
      }));

      // Keep the title slide, append the rest
      this.slides.update(current => [current[0], ...newSlides]);
      
    } catch (err) {
      console.error('Failed to generate outline', err);
    } finally {
      this.isGeneratingOutline.set(false);
    }
  }

  async generateContentForSlide(slideId: string) {
    const slide = this.slides().find(s => s.id === slideId);
    if (!slide) return;

    this.updateSlide(slideId, { isGenerating: true });
    const { client, tone, language } = this.config();

    try {
      const content = await this.geminiService.generateSlideContent(slide.title, client, tone, language);
      this.updateSlide(slideId, { content });
    } catch (err) {
      console.error(err);
    } finally {
      this.updateSlide(slideId, { isGenerating: false });
    }
  }
}