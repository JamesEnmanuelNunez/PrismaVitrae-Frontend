import { useState, useEffect, useCallback, useRef } from 'react';
import { Icon } from '../../components/ui/Icon';
import { candidatosApi } from '../../api';
import type { Candidato } from '../../types';
import { ModalEdicion } from './ModalEdicion';

function MenuAcciones({ candidato, onEditar, onEliminar }: { candidato: Candidato; onEditar: (c: Candidato) => void; onEliminar: (c: Candidato) => void }) {
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickFuera(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    if (abierto) {
      document.addEventListener('mousedown', handleClickFuera);
    }
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, [abierto]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
      >
        <Icon name="more_vert" size={18} />
      </button>
      {abierto && (
        <div className="absolute left-0 top-full mt-1 w-40 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-[0px_4px_12px_rgba(0,0,0,0.08)] z-[100] py-1">
          <button
            onClick={() => {
              setAbierto(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-on-surface hover:bg-surface-container-high transition-colors text-left"
          >
            <Icon name="visibility" size={16} className="text-secondary" />
            <span className="font-body-sm text-[14px]">Ver detalles</span>
          </button>
          <button
            onClick={() => {
              setAbierto(false);
              onEditar(candidato);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-on-surface hover:bg-surface-container-high transition-colors text-left"
          >
            <Icon name="edit" size={16} className="text-secondary" />
            <span className="font-body-sm text-[14px]">Editar</span>
          </button>
          <div className="border-t border-outline-variant/50 my-1" />
          <button
            onClick={() => {
              setAbierto(false);
              onEliminar(candidato);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error-container/30 transition-colors text-left"
          >
            <Icon name="delete" size={16} className="text-error" />
            <span className="font-body-sm text-[14px]">Eliminar</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function EditableTable() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candidatoEditando, setCandidatoEditando] = useState<Candidato | null>(null);

  const cargarDatos = useCallback(async () => {
    try {
      setCargando(true);
      const data = await candidatosApi.list(0, 100);
      console.log('Datos cargados:', data);
      setCandidatos(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar:', err);
      setError('Error al cargar los candidatos');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleGuardar = async (datos: Partial<Candidato>) => {
    if (!candidatoEditando) return;
    try {
      const datosLimpios = {
        nombre: datos.nombre,
        telefono: datos.telefono,
        email: datos.email,
        educacion: datos.escolaridad,
        datos_crudos: {
          ...candidatoEditando.datos_crudos,
          cedula: datos.cedula,
          sexo: datos.sexo,
          cargo_solicitado: datos.cargo_solicitado,
          escolaridad: datos.escolaridad,
          en_sustitucion_de: datos.en_sustitucion_de,
          cedula_no: datos.cedula_no,
          fecha_ingreso: datos.fecha_ingreso,
          centro: datos.centro,
          referido_por: datos.referido_por,
          reg_dist: datos.reg_dist,
        },
      };
      await candidatosApi.update(candidatoEditando.id, datosLimpios);
      await cargarDatos();
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

  const handleEliminar = async (candidato: Candidato) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${candidato.nombre}? Esta acción no se puede deshacer.`)) {
      try {
        await candidatosApi.delete(candidato.id);
        await cargarDatos();
      } catch (err) {
        console.error('Error al eliminar:', err);
        alert('Hubo un error al intentar eliminar el candidato.');
      }
    }
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center p-16">
        <Icon name="sync" size={32} className="text-primary animate-subtle-pulse" />
        <span className="ml-3 font-body-md text-[16px] text-secondary">Cargando candidatos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-16">
        <Icon name="error_outline" size={48} className="text-error mb-4" />
        <p className="font-body-md text-[16px] text-error">{error}</p>
        <button
          onClick={cargarDatos}
          className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-[12px] hover:bg-primary/90 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="h-full bg-surface-container-lowest rounded-xl border-2 border-outline-variant overflow-visible flex flex-col shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto overflow-y-auto flex-1 relative">
          {candidatos.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16">
              <Icon name="person_search" size={48} className="text-outline mb-4" />
              <p className="font-body-md text-[16px] text-secondary">No hay candidatos registrados</p>
              <p className="font-body-sm text-[14px] text-outline mt-1">Suba un CV para comenzar</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-container-low border-b border-outline-variant z-20">
                <tr>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase w-[40px]"></th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase w-[40px]">No</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase min-w-[150px]">Nombre Completo</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase w-[70px]">Regional</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase w-[70px]">Distrito</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase min-w-[110px]">Cédula</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase w-[70px]">Sexo</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase min-w-[130px]">Cargo Solicitado</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase min-w-[100px]">Escolaridad</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase min-w-[120px]">En Sustitución De</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase min-w-[100px]">Cédula No.</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase w-[90px]">Fecha Ingreso</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase min-w-[100px]">Centro</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase min-w-[100px]">Referido Por</th>
                  <th className="py-3 px-2 font-label-md text-[10px] leading-[14px] tracking-[0.05em] text-secondary uppercase w-[100px]">Teléfono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40 font-body-sm text-[12px] leading-[16px] text-on-surface">
                {candidatos.map((c) => {
                  const dc = c.datos_crudos || {};
                  const regional = (dc.regional as string) || (dc.reg_dist as string)?.split('/')[0] || '-';
                  const distrito = (dc.distrito as string) || (dc.reg_dist as string)?.split('/')[1] || '-';
                  return (
                    <tr key={c.id} className="group hover:bg-surface-container-low transition-colors">
                      <td className="py-2 px-2">
                        <MenuAcciones candidato={c} onEditar={setCandidatoEditando} onEliminar={handleEliminar} />
                      </td>
                      <td className="py-2 px-2">{(dc.no as number) || '-'}</td>
                      <td className="py-2 px-2 font-medium">{c.nombre}</td>
                      <td className="py-2 px-2">{regional}</td>
                      <td className="py-2 px-2">{distrito}</td>
                      <td className="py-2 px-2">{(dc.cedula as string) || '-'}</td>
                      <td className="py-2 px-2">{(dc.sexo as string) || '-'}</td>
                      <td className="py-2 px-2">{(dc.cargo_solicitado as string) || '-'}</td>
                      <td className="py-2 px-2">{c.educacion || '-'}</td>
                      <td className="py-2 px-2">{(dc.en_sustitucion_de as string) || '-'}</td>
                      <td className="py-2 px-2">{(dc.cedula_no as string) || '-'}</td>
                      <td className="py-2 px-2">{(dc.fecha_ingreso as string) || '-'}</td>
                      <td className="py-2 px-2">{(dc.centro as string) || '-'}</td>
                      <td className="py-2 px-2">{(dc.referido_por as string) || '-'}</td>
                      <td className="py-2 px-2">{c.telefono || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="border-t border-outline-variant bg-surface-container-lowest p-2 px-4 flex items-center justify-between text-[13px] leading-[18px] text-secondary">
          <div>
            Mostrando {candidatos.length} {candidatos.length === 1 ? 'candidato' : 'candidatos'}
          </div>
        </div>
      </div>

      <ModalEdicion
        candidato={candidatoEditando}
        abierto={candidatoEditando !== null}
        onCerrar={() => setCandidatoEditando(null)}
        onGuardar={handleGuardar}
      />
    </>
  );
}
