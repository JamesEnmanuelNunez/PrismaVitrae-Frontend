import { Icon } from '../../components/ui/Icon';

export function SettingsView() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="w-full h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-10 sticky top-0 z-10">
        <div className="flex items-center">
          <span className="font-headline-md text-[24px] leading-[32px] tracking-[-0.01em] font-bold text-on-surface">
            Configuración del Sistema
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

      <main className="flex-1 flex items-center justify-center p-10 md:p-12">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center mb-6 shadow-sm">
            <Icon name="build_circle" filled size={48} className="text-primary" />
          </div>
          <h2 className="font-display-lg text-[48px] leading-[56px] tracking-[-0.02em] text-on-surface mb-4">
            Próximamente
          </h2>
          <p className="font-body-lg text-[18px] leading-[28px] text-secondary max-w-lg mx-auto mb-8">
            El módulo de configuración está en desarrollo activo. Los controles avanzados del sistema estarán disponibles en una actualización futura.
          </p>
          <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 md:p-8 min-h-[400px] flex flex-col relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #001e2f 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="flex-1 flex flex-col items-center justify-center z-10 border-2 border-dashed border-outline-variant/50 rounded-lg">
              <Icon name="view_quilt" size={32} className="text-outline mb-2" />
              <span className="font-label-md text-[12px] leading-[16px] tracking-[0.05em] text-outline uppercase">
                Reservado para Formularios de Configuración
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
