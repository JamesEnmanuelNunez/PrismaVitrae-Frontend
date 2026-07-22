import { useState, useEffect } from 'react';
import { Icon } from '../../components/ui/Icon';
import type { Candidato } from '../../types';

interface ModalEdicionProps {
  candidato: Candidato | null;
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (datos: Partial<Candidato>) => void;
}

export function ModalEdicion({ candidato, abierto, onCerrar, onGuardar }: ModalEdicionProps) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    cedula: '',
    regional: '',
    distrito: '',
    sexo: '',
    cargo_solicitado: '',
    escolaridad: '',
    en_sustitucion_de: '',
    cedula_no: '',
    fecha_ingreso: '',
    centro: '',
    referido_por: '',
    telefono: '',
  });

  useEffect(() => {
    if (candidato) {
      const dc = candidato.datos_crudos || {};
      const regional = (dc.regional as string) || (dc.reg_dist as string)?.split('/')[0] || '';
      const distrito = (dc.distrito as string) || (dc.reg_dist as string)?.split('/')[1] || '';
      setFormulario({
        nombre: candidato.nombre || '',
        cedula: (dc.cedula as string) || '',
        regional,
        distrito,
        sexo: (dc.sexo as string) || '',
        cargo_solicitado: (dc.cargo_solicitado as string) || '',
        escolaridad: candidato.educacion || '',
        en_sustitucion_de: (dc.en_sustitucion_de as string) || '',
        cedula_no: (dc.cedula_no as string) || '',
        fecha_ingreso: (dc.fecha_ingreso as string) || '',
        centro: (dc.centro as string) || '',
        referido_por: (dc.referido_por as string) || '',
        telefono: candidato.telefono || '',
      });
    }
  }, [candidato]);

  if (!abierto || !candidato) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCerrar} />

      <div className="relative bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0px_20px_60px_rgba(0,0,0,0.15)] w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
          <h3 className="font-headline-md text-[20px] leading-[28px] font-bold text-on-surface">
            Editar Candidato
          </h3>
          <button
            onClick={onCerrar}
            className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-3 gap-4">
            {/* NO. */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                NO.
              </label>
              <input
                type="text"
                value={candidato.no || candidato.id.slice(0, 8)}
                disabled
                className="w-full px-3 py-2.5 bg-surface-container-high border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface-variant cursor-not-allowed"
              />
            </div>

            {/* NOMBRE COMPLETO */}
            <div className="col-span-2">
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                NOMBRE COMPLETO
              </label>
              <input
                type="text"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* CÉDULA */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                CÉDULA
              </label>
              <input
                type="text"
                value={formulario.cedula}
                onChange={(e) => setFormulario({ ...formulario, cedula: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* SEXO */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                SEXO
              </label>
              <select
                value={formulario.sexo}
                onChange={(e) => setFormulario({ ...formulario, sexo: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            {/* CARGO SOLICITADO */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                CARGO SOLICITADO
              </label>
              <input
                type="text"
                value={formulario.cargo_solicitado}
                onChange={(e) => setFormulario({ ...formulario, cargo_solicitado: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* REGIONAL */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                REGIONAL
              </label>
              <input
                type="text"
                value={formulario.regional}
                onChange={(e) => setFormulario({ ...formulario, regional: e.target.value })}
                placeholder="Ej: 01"
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* DISTRITO */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                DISTRITO
              </label>
              <input
                type="text"
                value={formulario.distrito}
                onChange={(e) => setFormulario({ ...formulario, distrito: e.target.value })}
                placeholder="Ej: 15"
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* ESCOLARIDAD */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                ESCOLARIDAD
              </label>
              <input
                type="text"
                value={formulario.escolaridad}
                onChange={(e) => setFormulario({ ...formulario, escolaridad: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* EN SUSTITUCIÓN DE */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                EN SUSTITUCIÓN DE
              </label>
              <input
                type="text"
                value={formulario.en_sustitucion_de}
                onChange={(e) => setFormulario({ ...formulario, en_sustitucion_de: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* CÉDULA NO. */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                CÉDULA NO.
              </label>
              <input
                type="text"
                value={formulario.cedula_no}
                onChange={(e) => setFormulario({ ...formulario, cedula_no: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* FECHA DE INGRESO */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                FECHA DE INGRESO
              </label>
              <input
                type="date"
                value={formulario.fecha_ingreso}
                onChange={(e) => setFormulario({ ...formulario, fecha_ingreso: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* CENTRO */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                CENTRO
              </label>
              <input
                type="text"
                value={formulario.centro}
                onChange={(e) => setFormulario({ ...formulario, centro: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* REFERIDO POR */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                REFERIDO POR
              </label>
              <input
                type="text"
                value={formulario.referido_por}
                onChange={(e) => setFormulario({ ...formulario, referido_por: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>

            {/* TELÉFONO */}
            <div>
              <label className="block font-label-md text-[11px] leading-[14px] tracking-[0.05em] text-secondary mb-1">
                TELÉFONO
              </label>
              <input
                type="tel"
                value={formulario.telefono}
                onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
                className="w-full px-3 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-[14px] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-outline-variant">
          <button
            onClick={onCerrar}
            className="px-4 py-2 bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low rounded-lg font-label-md text-[12px] leading-[16px] tracking-[0.05em] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onGuardar({
                ...formulario,
                reg_dist: `${formulario.regional}/${formulario.distrito}`,
              });
              onCerrar();
            }}
            className="px-4 py-2 bg-primary text-on-primary hover:bg-primary/90 rounded-lg font-label-md text-[12px] leading-[16px] tracking-[0.05em] transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
