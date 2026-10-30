import React, { useState } from 'react';
import { Aprendiz, FichaCaract } from '../types/sena';
import { UserPlus, X, Check } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface NewApprenticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  fichas: FichaCaract[];
  onAddAprendiz: (aprendiz: Aprendiz) => void;
}

export const NewApprenticeModal: React.FC<NewApprenticeModalProps> = ({
  isOpen,
  onClose,
  fichas,
  onAddAprendiz
}) => {
  const [nombre, setNombre] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState<'CC' | 'TI' | 'CE' | 'PEP'>('CC');
  const [documento, setDocumento] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fichaId, setFichaId] = useState(fichas[0]?.id || '');
  const [jornada, setJornada] = useState<'Diurna' | 'Nocturna' | 'Mixta' | 'Virtual'>('Diurna');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !documento.trim()) return;

    const selectedFicha = fichas.find(f => f.id === fichaId) || fichas[0];

    const newAprendiz: Aprendiz = {
      id: `apr_${Date.now()}`,
      nombre: nombre.trim(),
      documento: documento.trim(),
      tipoDocumento,
      correo: correo.trim() || `${documento.trim()}@soy.sena.edu.co`,
      telefono: telefono.trim() || '3000000000',
      fichaId: selectedFicha.id,
      fichaNumero: selectedFicha.numero,
      programaFormacion: selectedFicha.programa,
      regional: selectedFicha.regional,
      centroFormacion: selectedFicha.centro,
      jornada,
      progresoInduccion: 0,
      modulosCompletados: [],
      estadoEvaluacion: 'No iniciada'
    };

    onAddAprendiz(newAprendiz);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SenaLogo className="w-5 h-5" />
            <h3 className="text-base font-bold">Matricular Aprendiz a Inducción</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nombre Completo del Aprendiz *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Daniel Esteban Rojas Morales"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tipo Doc.
              </label>
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value as any)}
                className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
              >
                <option value="CC">Cédula (CC)</option>
                <option value="TI">Tarjeta Id. (TI)</option>
                <option value="CE">Cédula Ext. (CE)</option>
                <option value="PEP">Permiso (PEP)</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Número de Documento *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 1023948512"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Ficha de Caracterización *
            </label>
            <select
              value={fichaId}
              onChange={(e) => setFichaId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            >
              {fichas.map((f) => (
                <option key={f.id} value={f.id}>
                  Ficha {f.numero} - {f.programa}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@soy.sena.edu.co"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Jornada
              </label>
              <select
                value={jornada}
                onChange={(e) => setJornada(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
              >
                <option value="Diurna">Diurna</option>
                <option value="Nocturna">Nocturna</option>
                <option value="Mixta">Mixta</option>
                <option value="Virtual">Virtual</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#39A900] text-white hover:bg-[#329600] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Registrar en Inducción</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
