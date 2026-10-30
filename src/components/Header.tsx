import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SenaLogo } from './SenaLogo';
import { 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  GraduationCap, 
  UserCheck, 
  Home, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 group-hover:scale-105 transition-transform">
            <SenaLogo className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                SENA<span className="text-emerald-600 dark:text-emerald-400">Portal</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Acuerdo 2026 (Vigente)
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden md:block">
              Reglamento del Aprendiz SENA · Acuerdo 2026 (Deroga Acuerdo 007 de 2012)
            </p>
          </div>
        </Link>



        {/* Navigation & Controls */}
        <div className="flex items-center gap-3">
          
          <Link
            to="/"
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition text-xs font-semibold flex items-center gap-1.5"
            title="Página de inicio institucional"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User Status / Login / Logout */}
          {role ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {user?.nombre.split(' ')[0]} {user?.nombre.split(' ')[1] || ''}
                </span>
                <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 capitalize">
                  {role === 'instructor' ? 'Instructor Lider' : 'Aprendiz'}
                </span>
              </div>

              <div className={`p-1.5 rounded-lg ${
                role === 'instructor' 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                  : 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300'
              }`}>
                {role === 'instructor' ? <GraduationCap className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-xl transition cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition shadow-sm shadow-emerald-600/20"
            >
              <User className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};
