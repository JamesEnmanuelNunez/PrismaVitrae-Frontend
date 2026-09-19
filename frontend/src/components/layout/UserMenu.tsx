import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { useCurrentUser } from '../../hooks/useCurrentUser';

function Avatar({ initials, avatarUrl, size = 36 }: { initials: string; avatarUrl: string | null; size?: number }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt=""
        style={{ width: size, height: size }}
        className="rounded-full border border-outline-variant object-cover"
      />
    );
  }

  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-primary-container font-label-md text-[12px] font-bold tracking-[0.05em] text-on-primary-container"
    >
      {initials}
    </span>
  );
}

export function UserMenu() {
  const { user, loading, signOut } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (loading || !user) {
    return (
      <div
        className="h-9 w-32 animate-pulse rounded-full bg-surface-container-high"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Cuenta de ${user.name}`}
        className="flex items-center gap-3 rounded-full border border-transparent py-1 pl-1 pr-1 text-left transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:pr-3"
      >
        <Avatar initials={user.initials} avatarUrl={user.avatarUrl} />
        <span className="hidden min-w-0 flex-col md:flex">
          <span className="max-w-[160px] truncate font-body-sm text-[14px] leading-[18px] font-semibold text-on-surface">
            {user.name}
          </span>
          <span className="max-w-[160px] truncate font-body-sm text-[12px] leading-[16px] text-on-surface-variant">
            {user.email}
          </span>
        </span>
        <Icon
          name="expand_more"
          size={18}
          className={`hidden text-on-surface-variant transition-transform duration-200 md:block ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-xl"
        >
          <div className="flex items-center gap-3 border-b border-outline-variant/60 p-4">
            <Avatar initials={user.initials} avatarUrl={user.avatarUrl} size={40} />
            <div className="min-w-0">
              <p className="truncate font-body-sm text-[14px] font-semibold text-on-surface">
                {user.name}
              </p>
              <p className="truncate font-body-sm text-[12px] text-on-surface-variant">
                {user.email}
              </p>
            </div>
          </div>
          <div className="p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate('/app/settings');
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-body-sm text-[14px] text-on-surface transition-colors hover:bg-surface-container-high"
            >
              <Icon name="manage_accounts" size={18} className="text-on-surface-variant" />
              Configuración de la cuenta
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                void signOut();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-body-sm text-[14px] text-error transition-colors hover:bg-error-container/60"
            >
              <Icon name="logout" size={18} />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
