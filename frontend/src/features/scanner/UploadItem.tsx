import { useState, useEffect } from 'react';
import { Icon } from '../../components/ui/Icon';
import type { Candidato } from '../../types';

interface UploadItemProps {
  file: {
    id: string;
    name: string;
    size: number;
    status: 'subiendo' | 'procesando' | 'exito' | 'error';
    error?: string;
    candidato?: Candidato;
    fileObject: File;
  };
  onViewData?: (candidato: Candidato) => void;
  onRetry?: (id: string) => void;
  onPreview?: () => void;
}

function formatTamano(bytes: number): string {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export function UploadItem({ file, onViewData, onRetry, onPreview }: UploadItemProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file.fileObject && file.fileObject.type.startsWith('image/')) {
      const url = URL.createObjectURL(file.fileObject);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file.fileObject]);

  const config = {
    procesando: {
      iconBg: 'bg-secondary-container/30',
      iconColor: 'text-primary',
      badge: 'bg-surface-container text-on-surface-variant',
      badgeText: 'Procesando',
      badgeIcon: 'pending',
    },
    exito: {
      iconBg: 'bg-secondary-container/30',
      iconColor: 'text-primary',
      badge: 'bg-[#F0FDF4] border border-[#DCFCE7] text-[#166534]',
      badgeText: 'Exitoso',
      badgeIcon: 'check_circle',
    },
    error: {
      iconBg: 'bg-error-container/20',
      iconColor: 'text-error',
      badge: 'bg-error-container text-on-error-container',
      badgeText: 'Error',
      badgeIcon: 'error',
    },
    subiendo: {
      iconBg: 'bg-secondary-container/30',
      iconColor: 'text-primary',
      badge: 'bg-surface-container text-on-surface-variant',
      badgeText: 'Subiendo',
      badgeIcon: 'upload',
    },
  };

  const cfg = config[file.status];

  const getIcono = () => {
    if (file.name.endsWith('.pdf')) return 'picture_as_pdf';
    if (file.name.match(/\.(png|jpg|jpeg|gif)$/i)) return 'image';
    return 'description';
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center gap-4 hover:border-outline transition-colors">
      <div 
        className={`w-10 h-10 rounded ${cfg.iconBg} flex items-center justify-center ${cfg.iconColor} flex-shrink-0 overflow-hidden relative group ${onPreview ? 'cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all' : ''}`}
        onClick={onPreview}
        title="Ver previsualización"
      >
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
              <Icon name="visibility" size={16} className="text-white" />
            </div>
          </>
        ) : (
          <Icon name={getIcono()} size={20} />
        )}
      </div>
      <div 
        className={`flex-1 min-w-0 ${onPreview ? 'cursor-pointer group' : ''}`}
        onClick={onPreview}
      >
        <h4 className={`font-body-md text-[16px] leading-[24px] font-medium text-on-surface truncate ${onPreview ? 'group-hover:text-primary transition-colors' : ''}`}>
          {file.name}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-body-sm text-[14px] leading-[20px] text-secondary">
            {formatTamano(file.size)}
          </span>
          <span className="w-1 h-1 rounded-full bg-outline-variant" />
          {file.status === 'procesando' && (
            <span className="font-body-sm text-[14px] leading-[20px] text-secondary flex items-center gap-1">
              <Icon name="sync" size={14} className="animate-subtle-pulse" />
              Extrayendo entidades...
            </span>
          )}
          {file.status === 'exito' && file.candidato && (
            <span className="font-body-sm text-[14px] leading-[20px] text-secondary">
              Confianza: {Math.round(file.candidato.confianza * 100)}%
            </span>
          )}
          {file.status === 'error' && (
            <span className="font-body-sm text-[14px] leading-[20px] text-error">
              {file.error || 'Formato ilegible o archivo protegido'}
            </span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-4">
        {file.status === 'exito' && file.candidato && onViewData && (
          <button
            onClick={() => onViewData(file.candidato!)}
            className="text-primary hover:text-surface-tint font-label-md text-[12px] leading-[16px] tracking-[0.05em] transition-colors"
          >
            Ver Datos
          </button>
        )}
        {file.status === 'error' && onRetry && (
          <button
            onClick={() => onRetry(file.id)}
            className="text-secondary hover:text-on-surface font-label-md text-[12px] leading-[16px] tracking-[0.05em] transition-colors"
          >
            Reintentar
          </button>
        )}
        <div className={`px-2 py-1 rounded font-label-md text-[12px] leading-[16px] tracking-[0.05em] flex items-center gap-1 ${cfg.badge}`}>
          <Icon name={cfg.badgeIcon} size={14} filled={file.status !== 'procesando'} />
          {cfg.badgeText}
        </div>
      </div>
    </div>
  );
}
