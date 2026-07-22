interface HeaderContextualProps {
  titulo: string;
  subtitulo: string;
}

export function HeaderContextual({ titulo, subtitulo }: HeaderContextualProps) {
  return (
    <div className="col-span-12 mb-6">
      <h2 className="font-headline-lg text-[32px] leading-[40px] tracking-[-0.01em] text-on-surface mb-1">
        {titulo}
      </h2>
      <p className="font-body-md text-[16px] leading-[24px] text-secondary">
        {subtitulo}
      </p>
    </div>
  );
}
