import React, { createContext, useContext, useState, useEffect } from 'react';
import { Aprendiz, FichaCaract } from '../types/sena';
import { APRENDICES_INICIALES, FICHAS_MUESTRA } from '../data/senaData';

export type UserRole = 'instructor' | 'aprendiz' | null;

export interface AuthUser {
  id: string;
  nombre: string;
  documento: string;
  correo: string;
  role: 'instructor' | 'aprendiz';
  cargo?: string;
  regional?: string;
  centro?: string;
}

interface ResetResult {
  success: boolean;
  message: string;
  emailMasked?: string;
  tempToken?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  aprendices: Aprendiz[];
  fichas: FichaCaract[];
  activeAprendiz: Aprendiz;
  setActiveAprendiz: (aprendiz: Aprendiz) => void;
  updateAprendiz: (updated: Aprendiz) => void;
  addAprendiz: (newAprendiz: Aprendiz) => void;
  login: (identifier: string, password: string, preferredRole?: 'instructor' | 'aprendiz') => boolean;
  loginAs: (role: 'instructor' | 'aprendiz', aprendizId?: string) => void;
  logout: () => void;
  requestPasswordReset: (identifier: string) => ResetResult;
}

const INSTRUCTOR_DEMO: AuthUser = {
  id: 'inst_1',
  nombre: 'Dra. Marcela Restrepo Gómez',
  documento: '52891044',
  correo: 'mrestrepog@sena.edu.co',
  role: 'instructor',
  cargo: 'Instructora Líder y Coordinadora Académica',
  regional: 'Regional Distrito Capital',
  centro: 'Centro de Electricidad, Electrónica y Telecomunicaciones'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aprendices, setAprendices] = useState<Aprendiz[]>(() => {
    const saved = localStorage.getItem('sena_aprendices_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved aprendices', e);
      }
    }
    return APRENDICES_INICIALES;
  });

  const [fichas] = useState<FichaCaract[]>(FICHAS_MUESTRA);
  const [activeAprendizId, setActiveAprendizId] = useState<string>(() => {
    return localStorage.getItem('sena_active_aprendiz_id') || APRENDICES_INICIALES[0].id;
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedRole = localStorage.getItem('sena_auth_role') as UserRole;
    if (savedRole === 'instructor') {
      return INSTRUCTOR_DEMO;
    }
    if (savedRole === 'aprendiz') {
      const current = APRENDICES_INICIALES[0];
      return {
        id: current.id,
        nombre: current.nombre,
        documento: current.documento,
        correo: current.correo,
        role: 'aprendiz',
        regional: current.regional,
        centro: current.centroFormacion
      };
    }
    return null;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('sena_aprendices_state', JSON.stringify(aprendices));
  }, [aprendices]);

  useEffect(() => {
    if (user?.role) {
      localStorage.setItem('sena_auth_role', user.role);
    } else {
      localStorage.removeItem('sena_auth_role');
    }
  }, [user]);

  const activeAprendiz = aprendices.find(a => a.id === activeAprendizId) || aprendices[0];

  const setActiveAprendiz = (aprendiz: Aprendiz) => {
    setActiveAprendizId(aprendiz.id);
    localStorage.setItem('sena_active_aprendiz_id', aprendiz.id);
    if (user?.role === 'aprendiz') {
      setUser({
        id: aprendiz.id,
        nombre: aprendiz.nombre,
        documento: aprendiz.documento,
        correo: aprendiz.correo,
        role: 'aprendiz',
        regional: aprendiz.regional,
        centro: aprendiz.centroFormacion
      });
    }
  };

  const updateAprendiz = (updated: Aprendiz) => {
    setAprendices(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const addAprendiz = (newAprendiz: Aprendiz) => {
    setAprendices(prev => [newAprendiz, ...prev]);
  };

  const login = (identifier: string, password: string, preferredRole?: 'instructor' | 'aprendiz'): boolean => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanDoc = identifier.trim();

    // Check if Instructor credentials
    if (
      cleanId === 'instructor' ||
      cleanId === 'coordinador' ||
      cleanId === 'mrestrepog@sena.edu.co' ||
      cleanDoc === '52891044' ||
      cleanDoc === '12345678' ||
      preferredRole === 'instructor'
    ) {
      // Standard demo password or any 3+ char password for testing
      if (password === '123' || password === 'sena' || password === 'sena2024' || password.length >= 3) {
        setUser(INSTRUCTOR_DEMO);
        return true;
      }
    }

    // Check if Apprentice credentials matching an existing apprentice
    const matchedAprendiz = aprendices.find(
      a => a.documento === cleanDoc ||
           a.correo.toLowerCase() === cleanId ||
           a.nombre.toLowerCase().includes(cleanId)
    );

    if (matchedAprendiz) {
      if (password === '123' || password === 'sena' || password === 'sena2024' || password.length >= 3) {
        setActiveAprendiz(matchedAprendiz);
        setUser({
          id: matchedAprendiz.id,
          nombre: matchedAprendiz.nombre,
          documento: matchedAprendiz.documento,
          correo: matchedAprendiz.correo,
          role: 'aprendiz',
          regional: matchedAprendiz.regional,
          centro: matchedAprendiz.centroFormacion
        });
        return true;
      }
    }

    // Default generic 'aprendiz' test user
    if (cleanId === 'aprendiz' && (password === '123' || password === 'sena' || password === 'sena2024' || password.length >= 3)) {
      const first = aprendices[0];
      setActiveAprendiz(first);
      setUser({
        id: first.id,
        nombre: first.nombre,
        documento: first.documento,
        correo: first.correo,
        role: 'aprendiz',
        regional: first.regional,
        centro: first.centroFormacion
      });
      return true;
    }

    // If role is Aprendiz and valid password is provided, allow access with entered document/user
    if (preferredRole === 'aprendiz' && password.length >= 3) {
      const newApr: Aprendiz = {
        id: `apr_${Date.now()}`,
        nombre: isNaN(Number(identifier)) ? identifier : `Aprendiz ${identifier}`,
        documento: identifier,
        tipoDocumento: 'CC',
        correo: `${identifier.replace(/\s+/g, '').toLowerCase()}@soy.sena.edu.co`,
        telefono: '310' + Math.floor(1000000 + Math.random() * 9000000),
        fichaId: 'f_2824901',
        fichaNumero: '2824901',
        programaFormacion: 'Análisis y Desarrollo de Software (ADSO)',
        regional: 'Regional Distrito Capital',
        centroFormacion: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
        jornada: 'Diurna',
        progresoInduccion: 25,
        modulosCompletados: [],
        estadoEvaluacion: 'No iniciada'
      };
      setAprendices(prev => [newApr, ...prev]);
      setActiveAprendiz(newApr);
      setUser({
        id: newApr.id,
        nombre: newApr.nombre,
        documento: newApr.documento,
        correo: newApr.correo,
        role: 'aprendiz',
        regional: newApr.regional,
        centro: newApr.centroFormacion
      });
      return true;
    }

    return false;
  };


  const loginAs = (roleToSet: 'instructor' | 'aprendiz', aprendizId?: string) => {
    if (roleToSet === 'instructor') {
      setUser(INSTRUCTOR_DEMO);
    } else {
      const selected = aprendizId ? aprendices.find(a => a.id === aprendizId) || aprendices[0] : aprendices[0];
      setActiveAprendiz(selected);
      setUser({
        id: selected.id,
        nombre: selected.nombre,
        documento: selected.documento,
        correo: selected.correo,
        role: 'aprendiz',
        regional: selected.regional,
        centro: selected.centroFormacion
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sena_auth_role');
  };

  const requestPasswordReset = (identifier: string): ResetResult => {
    const clean = identifier.trim().toLowerCase();
    if (!clean) {
      return { success: false, message: 'Ingresa tu número de documento o correo institucional.' };
    }

    // Check instructor
    if (clean === 'instructor' || clean === '52891044' || clean.includes('sena.edu.co')) {
      return {
        success: true,
        message: 'Se ha enviado un enlace seguro de restablecimiento a tu correo institucional SENA.',
        emailMasked: 'm*****g@sena.edu.co',
        tempToken: `SENA-PASS-${Math.floor(100000 + Math.random() * 900000)}`
      };
    }

    // Check apprentice
    const found = aprendices.find(a => a.documento === clean || a.correo.toLowerCase() === clean);
    if (found) {
      const [userPart, domain] = found.correo.split('@');
      const masked = userPart.slice(0, 2) + '****' + userPart.slice(-1) + '@' + (domain || 'soy.sena.edu.co');
      return {
        success: true,
        message: `Instrucciones de recuperación enviadas a la cuenta institucional vinculada a ${found.nombre}.`,
        emailMasked: masked,
        tempToken: `SENA-PASS-${Math.floor(100000 + Math.random() * 900000)}`
      };
    }

    // Generic fallback for any other valid-looking input
    return {
      success: true,
      message: 'Si los datos coinciden con un registro activo en el sistema SENA, recibirás un mensaje de recuperación.',
      emailMasked: 'c******@soy.sena.edu.co',
      tempToken: `SENA-PASS-${Math.floor(100000 + Math.random() * 900000)}`
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        aprendices,
        fichas,
        activeAprendiz,
        setActiveAprendiz,
        updateAprendiz,
        addAprendiz,
        login,
        loginAs,
        logout,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
