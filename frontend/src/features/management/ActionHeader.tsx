import { Icon } from '../../components/ui/Icon';

interface ActionHeaderProps {
  titulo: string;
  subtitulo: string;
  onExportPdf?: () => void;
  onExportExcel?: () => void;
}

export function ActionHeader({ titulo, subtitulo, onExportPdf, onExportExcel }: ActionHeaderProps) {
  return (
    <header className="px-10 py-6 flex justify-between items-end border-b border-outline-variant/50 bg-surface/80 backdrop-blur-sm z-10 flex-shrink-0">
      <div>
        <h2 className="font-headline-lg text-[32px] leading-[40px] tracking-[-0.01em] text-on-surface">
          {titulo}
        </h2>
        <p className="font-body-sm text-[14px] leading-[20px] text-on-surface-variant mt-1">
          {subtitulo}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onExportPdf}
          className="bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-md text-[12px] leading-[16px] tracking-[0.05em] py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Icon name="picture_as_pdf" size={18} />
          Exportar a PDF
        </button>
        <button
          onClick={onExportExcel}
          className="bg-primary text-on-primary hover:bg-primary/90 font-label-md text-[12px] leading-[16px] tracking-[0.05em] py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Icon name="table_view" size={18} />
          Exportar a Excel
        </button>
      </div>
    </header>
  );
}
