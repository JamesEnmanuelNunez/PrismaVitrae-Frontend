import { useState, useEffect, useCallback } from 'react';
import { Icon } from '../../components/ui/Icon';
import { noProcedenApi } from '../../api';
import type { NoProcede } from '../../types';

export function NoProcedenTable() {
  const [datos, setDatos] = useState<NoProcede[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarDatos = useCallback(async () => {
    try {
      setCargando(true);
      const data = await noProcedenApi.list(0, 100);
      setDatos(data);
      setError(null);
    } catch {
      setError('Error al cargar los registros');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  if (cargando) {
    return (
      <div className="flex items-center justify-center p-16">
        <Icon name="sync" size={32} className="text-primary animate-subtle-pulse" />
        <span className="ml-3 font-body-md text-[16px] text-secondary">Cargando registros...</span>
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
    <div className="h-full bg-surface-container-lowest rounded-xl border-2 border-outline-variant overflow-visible flex flex-col shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto overflow-y-auto flex-1">
        {datos.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16">
            <Icon name="block" size={48} className="text-outline mb-4" />
            <p className="font-body-md text-[16px] text-secondary">No hay registros en "No Proceden"</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-surface-container-low border-b border-outline-variant z-20">
              <tr>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase w-[40px] text-center">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                </th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase w-[50px]">No</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase w-[80px]">Reg/Dist</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase w-[100px]">Cédula</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase min-w-[180px]">Nombre Completo</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase w-[60px]">Sexo</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase min-w-[150px]">Cargo Solicitado</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase w-[120px]">Salario Solicitado</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase min-w-[120px]">Escolaridad</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase min-w-[140px]">Observación</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase min-w-[120px]">Referido Por</th>
                <th className="py-3 px-3 font-label-md text-[11px] leading-[16px] tracking-[0.05em] text-secondary uppercase w-[110px]">Teléfono</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 font-body-sm text-[13px] leading-[18px] text-on-surface">
              {datos.map((fila) => (
                <tr key={fila.id} className="group hover:bg-surface-container-low transition-colors">
                  <td className="py-2 px-3 text-center">
                    <input className="rounded border-outline-variant text-primary focus:ring-primary opacity-50 group-hover:opacity-100 transition-opacity" type="checkbox" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.no}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.reg_dist || '-'}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.cedula}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell font-medium">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.nombre_completo}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.sexo || '-'}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.cargo_solicitado || '-'}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full font-code-sm" contentEditable suppressContentEditableWarning>
                      {fila.salario_solicitado ? `$${fila.salario_solicitado.toLocaleString()}` : '-'}
                    </div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.escolaridad || '-'}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.observacion || '-'}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.referido_por || '-'}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                  <td className="py-2 px-3 editable-cell">
                    <div className="outline-none py-1 px-1 rounded w-full" contentEditable suppressContentEditableWarning>{fila.telefono || '-'}</div>
                    <Icon name="edit" size={14} className="text-outline edit-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="border-t border-outline-variant bg-surface-container-lowest p-2 px-4 flex items-center justify-between text-[13px] leading-[18px] text-secondary">
        <div>
          Mostrando {datos.length} {datos.length === 1 ? 'registro' : 'registros'}
        </div>
      </div>
    </div>
  );
}
