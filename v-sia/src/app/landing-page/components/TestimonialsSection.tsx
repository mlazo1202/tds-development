'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
{
  id: 'testimonial-lucia',
  name: 'Lucía Fernández',
  role: 'Estudiante universitaria, Lima',
  initials: 'LF',
  color: 'bg-violet-600',
  quote:
  'Por primera vez puedo participar en clase sin necesitar que alguien me interprete. SeñasIA entiende mis señas en segundos. Es como tener una voz que siempre estuvo ahí.'
},
{
  id: 'testimonial-carlos',
  name: 'Carlos Quispe',
  role: 'Diseñador gráfico, Arequipa',
  initials: 'CQ',
  color: 'bg-teal-600',
  quote:
  'Trabajo con clientes que no conocen LSP. Antes cada reunión era un reto. Ahora abro SeñasIA, señas, y ellos leen en tiempo real. Simple. Revolucionario para mi día a día.'
},
{
  id: 'testimonial-maria',
  name: 'María Elena Chávez',
  role: 'Docente de educación especial, Cusco',
  initials: 'MC',
  color: 'bg-indigo-500',
  quote:
  'Lo uso con mis estudiantes para reforzar vocabulario. La precisión del modelo es sorprendente y la interfaz es tan limpia que mis alumnos no tienen ninguna dificultad para usarla.'
}];


export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS?.length) % TESTIMONIALS?.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS?.length);

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-600 tracking-widest uppercase mb-3">
            Testimonios
          </span>
          <h2 className="text-4xl lg:text-5xl font-800 text-foreground tracking-tight leading-tight mb-4">
            Personas reales. Cambios reales.
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="card-base p-10 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 right-8 opacity-10">
              <Quote size={64} className="text-primary" />
            </div>

            <div className="animate-fade-in" key={`testimonial-slide-${current}`}>
              <p className="text-xl lg:text-2xl text-foreground font-500 leading-relaxed mb-8 relative z-10">
                &ldquo;{TESTIMONIALS?.[current]?.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-primary/20 ${TESTIMONIALS?.[current]?.color}`}>
                  <span className="text-white text-sm font-700 leading-none select-none">
                    {TESTIMONIALS?.[current]?.initials}
                  </span>
                </div>
                <div>
                  <p className="font-700 text-foreground text-sm">{TESTIMONIALS?.[current]?.name}</p>
                  <p className="text-xs text-muted-foreground font-400">{TESTIMONIALS?.[current]?.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-white hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-200 hover:shadow-card"
              aria-label="Testimonio anterior">
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS?.map((_, i) =>
              <button
                key={`dot-${i}`}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                i === current ?
                'w-6 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-border hover:bg-primary/40'}`
                }
                aria-label={`Ir al testimonio ${i + 1}`} />
              )}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-white hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-200 hover:shadow-card"
              aria-label="Siguiente testimonio">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>);

}