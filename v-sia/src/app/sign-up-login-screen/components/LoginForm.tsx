'use client';

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  onSwitchToRegister: () => void;
}


const DEMO_CREDENTIALS = {
  email: 'pablito_cpp@gmail.com',
  password: 'pablito2026!',
};

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));

    if (
      data.email === DEMO_CREDENTIALS.email &&
      data.password === DEMO_CREDENTIALS.password
    ) {
      toast.success('Sesión iniciada correctamente. ¡Bienvenida, Pepito!');
      setTimeout(() => {
        window.location.href = '/translation-room';
      }, 800);
    } else {
      setLoading(false);
      setError('email', {
        message: 'Credenciales incorrectas. Verifica tu correo y contraseña.',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Mobile logo */}
      <div className="flex items-center gap-2.5 lg:hidden">
        <AppLogo size={36} />
        <span className="font-display text-xl font-700 text-foreground tracking-tight">SeñasIA</span>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-800 text-foreground tracking-tight mb-2">Iniciar sesión</h1>
        <p className="text-sm text-muted-foreground font-400">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary font-600 hover:underline transition-all"
          >
            Regístrate gratis
          </button>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-email" className="text-sm font-600 text-foreground">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
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

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-sm font-600 text-foreground">
              Contraseña
            </label>
            <button
              type="button"
              className="text-xs text-primary font-500 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              className={`input-base pr-11 ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 font-500">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
            {...register('remember')}
          />
          <span className="text-sm text-muted-foreground font-400 group-hover:text-foreground transition-colors">
            Recordarme en este dispositivo
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-600 rounded-xl mt-1"
          style={{ minHeight: '50px' }}
        >
          {loading ? (
            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <>
              <LogIn size={16} strokeWidth={2} />
              Iniciar sesión
            </>
          )}
        </button>
      </form>
    </div>
  );
}