'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface StatItem {
  id: string;
  prefix: string;
  numericValue: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const STATS: StatItem[] = [
{ id: 'stat-signs', prefix: '', numericValue: 120, suffix: '+', label: 'Señas reconocidas' },
{ id: 'stat-accuracy', prefix: '', numericValue: 94, suffix: '%', label: 'Precisión del modelo' },
{ id: 'stat-users', prefix: '+', numericValue: 2000, suffix: '', label: 'Usuarios activos' },
{ id: 'stat-latency', prefix: '<', numericValue: 300, suffix: 'ms', label: 'Milisegundos de latencia' }];


function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function AnimatedStat({ stat, animate }: {stat: StatItem;animate: boolean;}) {
  const count = useCountUp(stat.numericValue, 1500, animate);
  const displayValue = animate ? count : 0;

  return (
    <div
      key={stat.id}
      className="bg-slate-50 rounded-2xl p-5 border border-border hover:border-primary/30 hover:bg-violet-50 transition-all duration-200">
      
      <div className="text-3xl font-800 gradient-text tabular-nums">
        {stat.prefix}{displayValue.toLocaleString()}{stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
      </div>
      <p className="text-sm text-muted-foreground font-500 mt-1">{stat.label}</p>
    </div>);

}

export default function StatsSection() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animate) {
            setAnimate(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animate]);

  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl border border-black/5">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_169b1da70-1784356353564.png"
                alt="Primer plano de manos realizando una seña de lengua de señas, comunicación activa con las manos"
                fill
                className="object-cover"
                style={{ filter: 'saturate(1.15) contrast(1.05) hue-rotate(-10deg)' }}
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
              {/* Brand-tinted overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              {/* Bottom depth gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="inline-block text-secondary text-sm font-600 tracking-widest uppercase mb-3">
              Sobre el proyecto
            </span>
            <h2 className="text-4xl lg:text-5xl font-800 text-foreground tracking-tight leading-tight mb-6">
              La tecnología también puede hablar con las manos
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4 font-400">
              SeñasIA nació de una pregunta simple: ¿por qué las personas sordas tienen que depender de intérpretes para comunicarse en un mundo digital? Decidimos que la IA podía cambiar eso.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 font-400">
              Nuestro modelo, entrenado con miles de ejemplos de lengua de señas peruana (LSP), detecta y transcribe señas en tiempo real. Seguimos creciendo el vocabulario con la comunidad.
            </p>

            {/* Stats grid */}
            <div ref={sectionRef} className="grid grid-cols-2 gap-4">
              {STATS.map((stat) =>
              <AnimatedStat key={stat.id} stat={stat} animate={animate} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}