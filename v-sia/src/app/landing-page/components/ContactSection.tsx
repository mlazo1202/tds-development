'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  
  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
    toast.success('Mensaje enviado. Te responderemos pronto.');
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info side */}
          <div>
            <span className="inline-block text-secondary text-sm font-600 tracking-widest uppercase mb-3">
              Contacto
            </span>
            <h2 className="text-4xl lg:text-5xl font-800 text-foreground tracking-tight leading-tight mb-6">
              ¿Tienes preguntas o sugerencias?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 font-400">
              Estamos construyendo SeñasIA con y para la comunidad. Tu voz importa — cuéntanos tu experiencia, propón nuevas señas o simplemente saluda.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} strokeWidth={1.5} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-500 uppercase tracking-wide mb-0.5">Correo electrónico</p>
                  <p className="text-sm font-600 text-foreground">hola@iamanos.pe</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} strokeWidth={1.5} className="text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-500 uppercase tracking-wide mb-0.5">Ubicación</p>
                  <p className="text-sm font-600 text-foreground">Lima, Perú</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="card-base p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                  <CheckCircle size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-700 text-foreground">¡Mensaje recibido!</h3>
                <p className="text-sm text-muted-foreground font-400">
                  Gracias por escribirnos. Te responderemos en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-sm font-600 text-foreground">
                    Nombre completo
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Tu nombre"
                    className={`input-base ${errors.name ? 'input-error' : ''}`}
                    {...register('name', { required: 'El nombre es obligatorio' })}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 font-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-600 text-foreground">
                    Correo electrónico
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="tu@correo.com"
                    className={`input-base ${errors.email ? 'input-error' : ''}`}
                    {...register('email', {
                      required: 'El correo es obligatorio',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Correo no válido' },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-600 text-foreground">
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Cuéntanos tu experiencia, propón una seña nueva, o simplemente saluda..."
                    className={`input-base resize-none ${errors.message ? 'input-error' : ''}`}
                    {...register('message', {
                      required: 'El mensaje es obligatorio',
                      minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres' },
                    })}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 font-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-600 rounded-xl mt-1"
                  style={{ minWidth: '160px' }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} strokeWidth={2} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}