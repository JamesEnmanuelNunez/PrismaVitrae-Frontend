import { Icon } from '../../components/ui/Icon';

interface FilterBarProps {
  onSearch?: (valor: string) => void;
}

export function FilterBar({ onSearch }: FilterBarProps) {
  return (
    <div className="mb-4 flex justify-between items-center bg-surface-container-lowest p-2 px-4 rounded-lg border border-outline-variant flex-shrink-0">
      <div className="flex items-center gap-4 w-1/3">
        <Icon name="search" className="text-outline" />
        <input
          className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body-sm text-[14px] leading-[20px] placeholder:text-outline-variant outline-none"
          placeholder="Buscar candidatos, habilidades o ubicaciones..."
          type="text"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-code-sm text-[13px] leading-[18px] border border-outline-variant/50 cursor-pointer hover:bg-surface-variant">
          Estado: Revisión <Icon name="close" size={14} />
        </span>
        <button className="flex items-center gap-2 text-primary font-label-md text-[12px] leading-[16px] tracking-[0.05em] hover:text-primary-container transition-colors">
          <Icon name="filter_list" size={18} /> Agregar Filtro
        </button>
      </div>
    </div>
  );
}
