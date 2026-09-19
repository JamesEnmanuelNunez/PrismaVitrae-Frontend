import { useState } from 'react';
import { ActionHeader } from './ActionHeader';
import { FilterBar } from './FilterBar';
import { EditableTable } from './EditableTable';
import { NoProcedenTable } from './NoProcedenTable';
import { Icon } from '../../components/ui/Icon';
import { TopBar } from '../../components/layout/TopBar';
import { exportApi } from '../../api';

type TabActiva = 'candidatos' | 'no_proceden';

const tabs = [
  { id: 'candidatos' as const, label: 'Candidatos', icon: 'person' },
  { id: 'no_proceden' as const, label: 'No Proceden', icon: 'block' },
];

const titulos: Record<TabActiva, { titulo: string; subtitulo: string }> = {
  candidatos: {
    titulo: 'Registros de Candidatos',
    subtitulo: 'Revise y refine los datos extraídos de currículums procesados.',
  },
  no_proceden: {
    titulo: 'No Proceden',
    subtitulo: 'Registros de candidatos que no proceden.',
  },
};

export function DataTableView() {
  const [tabActiva, setTabActiva] = useState<TabActiva>('candidatos');

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <TopBar title="Gestión de Datos" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="px-10 border-b border-outline-variant/50 bg-surface/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-label-md text-[12px] leading-[16px] tracking-[0.05em] transition-colors border-b-2 ${
                  tabActiva === tab.id
                    ? 'text-primary border-primary font-bold'
                    : 'text-secondary border-transparent hover:text-on-surface hover:border-outline-variant'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ActionHeader
          titulo={titulos[tabActiva].titulo}
          subtitulo={titulos[tabActiva].subtitulo}
          onExportExcel={() => exportApi.downloadExcel(tabActiva === 'no_proceden' ? 'no_proceden' : tabActiva)}
        />
        <div className="flex-1 p-6 px-10 flex flex-col min-h-0">
          <FilterBar />
          <div className="flex-1 min-h-0">
            {tabActiva === 'candidatos' && <EditableTable />}
            {tabActiva === 'no_proceden' && <NoProcedenTable />}
          </div>
        </div>
      </div>
    </div>
  );
}
