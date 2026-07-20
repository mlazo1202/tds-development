import React from 'react';
import { Camera, Hand, ScanEye, Captions } from 'lucide-react';

const STEPS = [
  {
    id: 'step-camera',
    number: '01',
    icon: Camera,
    title: 'Activa tu cámara',
    description: 'Con un clic, SeñasIA accede a tu cámara de forma segura. Tu video nunca sale de tu dispositivo.',
  },
  {
    id: 'step-hand',
    number: '02',
    icon: Hand,
    title: 'Realiza tus señas',
    description: 'Habla con tus manos como siempre lo has hecho. El sistema reconoce más de 120 señas del vocabulario LSP.',
  },
  {
    id: 'step-scan',
    number: '03',
    icon: ScanEye,
    title: 'La IA detecta en tiempo real',
    description: 'Nuestro modelo analiza cada fotograma con menos de 300ms de latencia. Rápido, preciso, continuo.',
  },
  {
    id: 'step-captions',
    number: '04',
    icon: Captions,
    title: 'El texto aparece solo',
    description: 'Las palabras detectadas se transcriben automáticamente en el panel. Sin escribir, sin esperar.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block text-primary text-sm font-600 tracking-widest uppercase mb-3">
            Cómo funciona
          </span>
          <h2 className="text-4xl lg:text-5xl font-800 text-foreground tracking-tight leading-tight mb-4">
            Cuatro pasos hacia la comunicación sin límites
          </h2>
          <p className="text-lg text-muted-foreground font-400 leading-relaxed">
            Diseñado para ser simple desde el primer uso. Sin configuración, sin instalaciones, sin complicaciones.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS?.map((step, index) => {
            const StepIcon = step?.icon;
            return (
              <div
                key={step?.id}
                className="relative group border border-border rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 cursor-default"
              >
                {/* Connector line */}
                {index < STEPS?.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-8 h-px bg-gradient-to-r from-border to-transparent z-0 -translate-y-1/2" />
                )}
                <div className="relative z-10 flex flex-col gap-5">
                  {/* Number + Icon */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center group-hover:bg-primary group-hover:shadow-violet transition-all duration-300">
                        <StepIcon
                          size={28}
                          strokeWidth={1.5}
                          className="text-primary group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-700 text-foreground mb-2">{step?.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-400">
                      {step?.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}