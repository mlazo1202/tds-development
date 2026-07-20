'use client';

import React from 'react';
import Link from 'next/link';
import { Play, ChevronDown } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const handleScrollDown = () => {
    const el = document.getElementById('como-funciona');
    if (el) el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1093ae924-1769072995160.png"
          alt="Primer plano de manos realizando una seña de lengua de señas con iluminación clara"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw" />
        

        {/* Gradient overlay */}
        <div className="absolute inset-0 gradient-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 w-full pt-24 pb-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary-light pulse-dot" />
            
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-800 text-white leading-tight tracking-tight text-balance mb-5">
            Tu voz,<br />
            <span className="text-secondary-light">en tus manos.</span>
          </h1>

          <p className="text-lg lg:text-xl text-white/80 font-400 leading-relaxed mb-10 max-w-xl">
            SeñasIA traduce lengua de señas a texto en tiempo real. Sin barreras, sin intermediarios — solo tú y la tecnología trabajando juntos.
          </p>

          {/* Single CTA */}
          <Link
            href="/sign-up-login-screen"
            className="inline-flex items-center gap-3 btn-primary px-8 py-4 text-base font-600 rounded-xl shadow-violet">
            
            <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
              <Play size={14} fill="white" strokeWidth={0} />
            </span>
            Probar ahora
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 group"
        aria-label="Ver más contenido">
        
        <span className="text-xs font-500 tracking-widest uppercase">Descubre más</span>
        <ChevronDown
          size={24}
          className="animate-bounce-slow group-hover:text-secondary-light transition-colors" />
        
      </button>
    </section>);

}