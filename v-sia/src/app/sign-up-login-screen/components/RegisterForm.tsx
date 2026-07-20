'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UserPlus, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: 'bg-border' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: 'Débil', color: 'bg-red-500' };
  if (score === 2) return { score: 2, label: 'Regular', color: 'bg-amber-500' };
  if (score === 3) return { score: 3, label: 'Buena', color: 'bg-blue-500' };
  return { score: 4, label: 'Excelente', color: 'bg-emerald-500' };
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({ mode: 'onChange' });

  const watchedPassword = watch('password', '');

  useEffect(() => {
    setPasswordValue(watchedPassword || '');
  }, [watchedPassword]);

  const strength = getPasswordStrength(passwordValue);

  const passwordRules = [
    { key: 'pw-rule-length', label: 'Mínimo 8 caracteres', met: passwordValue.length >= 8 },
    { key: 'pw-rule-upper', label: 'Al menos una mayúscula', met: /[A-Z]/.test(passwordValue) },
    { key: 'pw-rule-number', label: 'Al menos un número', met: /[0-9]/.test(passwordValue) },
    { key: 'pw-rule-special', label: 'Un carácter especial (!@#$...)', met: /[^A-Za-z0-9]/.test(passwordValue) },
  ];

  // Backend integration point: POST /api/auth/register
  const onSubmit = async (_data: RegisterFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    toast.success('Cuenta creada exitosamente. ¡Bienvenido a SeñasIA!');
    setTimeout(() => {
      window.location.href = '/translation-room';
    }, 800);
  };

  return (
    <div className="flex flex-col gap-7">
      {/* Mobile logo */}
      <div className="flex items-center gap-2.5 lg:hidden">
        <AppLogo size={36} />
        <span className="font-display text-xl font-700 text-foreground tracking-tight">SeñasIA</span>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-800 text-foreground tracking-tight mb-2">Crear cuenta</h1>
        <p className="text-sm text-muted-foreground font-400">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary font-600 hover:underline transition-all"
          >
            Inicia sesión
          </button>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {/* Full name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-name" className="text-sm font-600 text-foreground">
            Nombre completo
          </label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            placeholder="Lucía Fernández"
            className={`input-base ${
              errors.fullName ? 'input-error' : watch('fullName') ? 'input-success' : ''
            }`}
            {...register('fullName', {
              required: 'El nombre es obligatorio',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            })}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 font-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-email" className="text-sm font-600 text-foreground">
            Correo electrónico
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            className={`input-base ${
              errors.email ? 'input-error' : watch('email') ? 'input-success' : ''
            }`}
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
          <label htmlFor="reg-password" className="text-sm font-600 text-foreground">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              className={`input-base pr-11 ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                validate: (v) =>
                  getPasswordStrength(v).score >= 2 || 'La contraseña es demasiado débil',
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

          {/* Strength bar */}
          {passwordValue && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={`strength-bar-${i}`}
                    className={`h-1.5 flex-1 rounded-full password-strength-bar ${
                      i <= strength.score ? strength.color : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs font-600 ${
                strength.score <= 1 ? 'text-red-500' :
                strength.score === 2 ? 'text-amber-500' :
                strength.score === 3 ? 'text-blue-500' : 'text-emerald-500'
              }`}>
                Contraseña {strength.label}
              </p>
            </div>
          )}

          {/* Rules */}
          {passwordValue && (
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              {passwordRules.map((rule) => (
                <div key={rule.key} className="flex items-center gap-1.5">
                  {rule.met ? (
                    <Check size={12} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <X size={12} className="text-muted-foreground flex-shrink-0" />
                  )}
                  <span className={`text-xs font-400 ${rule.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {errors.password && (
            <p className="text-xs text-red-500 font-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="reg-confirm" className="text-sm font-600 text-foreground">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              id="reg-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              className={`input-base pr-11 ${
                errors.confirmPassword ? 'input-error' : watch('confirmPassword') && !errors.confirmPassword ? 'input-success' : ''
              }`}
              {...register('confirmPassword', {
                required: 'Confirma tu contraseña',
                validate: (v) => v === watch('password') || 'Las contraseñas no coinciden',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showConfirm ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 font-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms */}
        <p className="text-xs text-muted-foreground font-400 leading-relaxed">
          Al crear una cuenta aceptas nuestros{' '}
          <a href="/" className="text-primary hover:underline font-500">Términos de uso</a>
          {' '}y nuestra{' '}
          <a href="/" className="text-primary hover:underline font-500">Política de privacidad</a>.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !isValid}
          className="btn-primary flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-600 rounded-xl"
          style={{ minHeight: '50px' }}
        >
          {loading ? (
            <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <>
              <UserPlus size={16} strokeWidth={2} />
              Crear cuenta
            </>
          )}
        </button>
      </form>
    </div>
  );
}