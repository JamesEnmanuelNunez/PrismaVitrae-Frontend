import { useState, useCallback } from 'react';
import { HeaderContextual } from './HeaderContextual';
import { DropzoneUpload } from './DropzoneUpload';
import { UploadItem } from './UploadItem';
import { scannerApi, candidatosApi } from '../../api';
import type { Candidato } from '../../types';
import { Icon } from '../../components/ui/Icon';

interface ArchivoEnCola {
  id: string;
  name: string;
  size: number;
  status: 'subiendo' | 'procesando' | 'exito' | 'error';
  error?: string;
  candidato?: Candidato;
  fileObject: File;
}

export function ScannerView() {
  const [archivos, setArchivos] = useState<ArchivoEnCola[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleDrop = useCallback(async (nuevosArchivos: File[]) => {
    const nuevos: ArchivoEnCola[] = nuevosArchivos.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      status: 'subiendo' as const,
      fileObject: f,
    }));

    setArchivos((prev) => [...nuevos, ...prev]);

    for (const archivo of nuevos) {
      setArchivos((prev) =>
        prev.map((a) => (a.id === archivo.id ? { ...a, status: 'procesando' } : a))
      );

      try {
        const candidato = await scannerApi.scan(archivo.fileObject);
        setArchivos((prev) =>
          prev.map((a) =>
            a.id === archivo.id ? { ...a, status: 'exito', candidato } : a
          )
        );
      } catch (err) {
        setArchivos((prev) =>
          prev.map((a) =>
            a.id === archivo.id
              ? { ...a, status: 'error', error: 'Error al procesar el archivo' }
              : a
          )
        );
      }
    }
  }, []);

  const handleRetry = useCallback(async (id: string) => {
    const archivo = archivos.find((a) => a.id === id);
    if (!archivo) return;

    setArchivos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'procesando', error: undefined } : a))
    );

    try {
      const candidato = await candidatosApi.get(archivo.candidato?.id || '');
      setArchivos((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: 'exito', candidato } : a
        )
      );
    } catch {
      setArchivos((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: 'error', error: 'Error al reintentar' } : a
        )
      );
    }
  }, [archivos]);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
      <header className="w-full h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-10 sticky top-0 z-10">
        <div className="flex items-center">
          <span className="font-headline-md text-[24px] leading-[32px] tracking-[-0.01em] font-bold text-on-surface">
            Subir Documentos
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer duration-150">
            <Icon name="notifications" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer duration-150">
            <Icon name="help_outline" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer ml-2 bg-primary-container flex items-center justify-center">
            <span className="font-label-md text-[12px] leading-[16px] text-on-primary-container font-bold">PV</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-10">
        <div className="max-w-[1024px] mx-auto grid grid-cols-12 gap-6">
          <HeaderContextual
            titulo="Cargar Documentos"
            subtitulo="Suba CVs y documentos especializados para extracción estructurada."
          />

          <div className="col-span-12 mb-8">
            <DropzoneUpload onDrop={handleDrop} />
          </div>

          <div className="col-span-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-md text-[24px] leading-[32px] tracking-[-0.01em] text-on-surface">
                Procesamiento Activo
              </h3>
              <span className="font-label-md text-[12px] leading-[16px] tracking-[0.05em] text-secondary bg-surface-container-high px-2 py-1 rounded">
                {archivos.length} {archivos.length === 1 ? 'Elemento' : 'Elementos'}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {archivos.map((archivo) => (
                <UploadItem
                  key={archivo.id}
                  file={archivo}
                  onRetry={handleRetry}
                  onPreview={() => setPreviewFile(archivo.fileObject)}
                />
              ))}
              {archivos.length === 0 && (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-16 flex flex-col items-center justify-center">
                  <Icon name="cloud_upload" size={48} className="text-outline mb-4" />
                  <p className="font-body-md text-[16px] leading-[24px] text-secondary text-center">
                    Arrastre archivos aquí o haga clic para seleccionar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setPreviewFile(null)}>
          <div 
            className="bg-surface rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-outline-variant">
              <h3 className="font-headline-sm text-on-surface truncate">{previewFile.name}</h3>
              <button 
                onClick={() => setPreviewFile(null)}
                className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-surface-container-lowest p-4 flex items-center justify-center min-h-[400px]">
              {previewFile.type === 'application/pdf' ? (
                <iframe 
                  src={URL.createObjectURL(previewFile)} 
                  className="w-full h-[70vh] border-0 rounded"
                  title="PDF Preview"
                />
              ) : previewFile.type.startsWith('image/') ? (
                <img 
                  src={URL.createObjectURL(previewFile)} 
                  alt="Preview" 
                  className="max-w-full max-h-[70vh] object-contain rounded"
                />
              ) : (
                <p className="text-secondary">Vista previa no disponible para este tipo de archivo.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
