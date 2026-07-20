import React from 'react';
import { Accessibility, Zap, ShieldCheck } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const FEATURES = [
  {
    id: 'feature-accessibility',
    icon: Accessibility,
    iconColor: 'text-primary',
    bgColor: 'bg-violet-50',
    hoverBg: 'group-hover:bg-primary',
    hoverIcon: 'group-hover:text-white',
    title: 'Accesibilidad real',
    description:
      'Construido desde el principio para personas sordas y con discapacidad auditiva. Interfaz sin audio, sin ruido visual, con contraste accesible WCAG 2.1 AA.',
    badge: 'WCAG 2.1 AA',
  },
  {
    id: 'feature-realtime',
    icon: Zap,
    iconColor: 'text-secondary',
    bgColor: 'bg-teal-50',
    hoverBg: 'group-hover:bg-secondary',
    hoverIcon: 'group-hover:text-white',
    title: 'Detección en tiempo real',
    description:
      'Latencia menor a 300ms. El motor de IA procesa cada fotograma de tu cámara y entrega el resultado antes de que termines la seña.',
    badge: '<300ms',
  },
  {
    id: 'feature-privacy',
    icon: ShieldCheck,
    iconColor: 'text-violet-500',
    bgColor: 'bg-slate-50',
    hoverBg: 'group-hover:bg-slate-700',
    hoverIcon: 'group-hover:text-white',
    title: 'Tu video, solo tuyo',
    description:
      'El video de tu cámara nunca se almacena ni se envía a servidores externos. La inferencia ocurre en el momento y los frames se descartan de inmediato.',
    badge: 'Sin almacenamiento',
  },
];

export default function FeaturesSection() {
  return (
    <section id="producto" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-secondary text-sm font-600 tracking-widest uppercase mb-3">
            Características
          </span>
          <h2 className="text-4xl lg:text-5xl font-800 text-foreground tracking-tight leading-tight mb-4">
            Diseñado para quien lo necesita
          </h2>
          <p className="text-lg text-muted-foreground font-400 leading-relaxed">
            Cada decisión de diseño tiene un propósito: que la tecnología sirva a las personas, no al revés.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES?.map((feature) => {
            const Icon = feature?.icon;
            return (
              <div
                key={feature?.id}
                className="group card-base p-8 flex flex-col gap-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature?.bgColor} ${feature?.hoverBg} flex items-center justify-center transition-all duration-300`}
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.5}
                      className={`${feature?.iconColor} ${feature?.hoverIcon} transition-colors duration-300`}
                    />
                  </div>
                  <span className="text-xs font-600 bg-violet-50 text-primary px-3 py-1 rounded-full border border-violet-100">
                    {feature?.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-700 text-foreground mb-3">{feature?.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-400">
                    {feature?.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}