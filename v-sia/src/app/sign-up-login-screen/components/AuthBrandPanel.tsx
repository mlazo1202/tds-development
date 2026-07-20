import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import AppImage from '@/components/ui/AppImage';
import { Hand, Sparkles, Captions } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface AuthBrandPanelProps {
  mode: 'login' | 'register';
}

export default function AuthBrandPanel({ mode }: AuthBrandPanelProps) {
  return (
    <div className="hidden lg:flex lg:w-[520px] xl:w-[580px] flex-shrink-0 relative flex-col justify-between p-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <AppImage
          src="/assets/images/sign_language_asl_letter.png"
          alt="Persona realizando la seña de la letra A en lengua de señas americana, manos en primer plano con expresión amigable"
          fill
          className="object-cover object-center"
          sizes="580px" />
        
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        {/* Additional violet tint for brand consistency */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/30 via-transparent to-secondary/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Top: Logo */}
        <div className="flex items-center gap-3">
          <AppLogo size={40} />
          <span className="text-white font-display text-2xl font-700 tracking-tight">SeñasIA</span>
        </div>

        {/* Middle: Headline */}
        <div>
          <h2 className="text-4xl xl:text-5xl font-800 text-white leading-tight mb-5 drop-shadow-md">
            {mode === 'login' ? 'Bienvenido de vuelta' : 'Únete a la comunidad'}
          </h2>
          <p className="text-white/90 text-lg font-400 leading-relaxed mb-10 drop-shadow-sm">
            {mode === 'login' ? 'Tu cámara te espera. Continúa donde lo dejaste y sigue comunicándote sin barreras.' : 'Más de 2,000 personas ya usan SeñasIA para comunicarse. Es tu turno.'}
          </p>

          {/* Feature bullets */}
          <div className="flex flex-col gap-4">
            {[
            { icon: Hand, text: '120+ señas reconocidas en LSP', key: 'brand-feat-hand' },
            { icon: Sparkles, text: '94% de precisión del modelo', key: 'brand-feat-sparkles' },
            { icon: Captions, text: 'Transcripción en tiempo real', key: 'brand-feat-captions' }].
            map(({ icon: Icon, text, key }) =>
            <div key={key} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} strokeWidth={1.5} className="text-white" />
                </div>
                <span className="text-white font-500 text-sm drop-shadow-sm">{text}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Footer text */}
        <p className="text-white/60 text-xs font-400">
          © 2026 SeñasIA · Tecnología para la inclusión
        </p>
      </div>
    </div>);

}