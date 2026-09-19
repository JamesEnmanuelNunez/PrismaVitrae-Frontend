import { NavLink } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { useSidebar } from '../../pages/AppLayout';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const mainNavItems = [
  { to: '/app/', icon: 'cloud_upload', label: 'Subir Documentos' },
  { to: '/app/data-table', icon: 'table_chart', label: 'Tabla de Datos' },
  { to: '/app/settings', icon: 'settings', label: 'Configuración' },
];

export function SideNavBar() {
  const { collapsed, setCollapsed } = useSidebar();
  const { signOut } = useCurrentUser();

  const itemClasses = (isActive: boolean, collapsedLayout: boolean) =>
    `relative flex items-center rounded-lg font-label-md text-[12px] leading-[16px] tracking-[0.05em] transition-colors duration-200 ${
      collapsedLayout ? 'h-11 w-11 justify-center self-center' : 'gap-3 h-11 px-3'
    } ${
      isActive
        ? 'bg-secondary-container/50 text-primary'
        : 'text-secondary hover:bg-surface-container-high hover:text-on-surface'
    }`;

  const renderActiveBar = (isActive: boolean) =>
    collapsed ? null : (
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-200 ${
          isActive ? 'w-1 opacity-100' : 'w-0 opacity-0'
        }`}
      />
    );

  return (
    <nav
      aria-label="Navegación principal"
      className={`group/nav fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-outline-variant bg-surface-container-low transition-[width] duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
        aria-expanded={!collapsed}
        title={collapsed ? 'Expandir menú' : 'Contraer menú'}
        className="absolute -right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant shadow-sm transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Icon name={collapsed ? 'chevron_right' : 'chevron_left'} size={16} />
      </button>

      <div
        className={`mt-1 mb-4 flex items-center ${
          collapsed ? 'h-14 justify-center px-3' : 'h-16 px-4'
        }`}
      >
        {collapsed ? (
          <img
            src="/logo-mark.png"
            alt="PrismaVitae"
            className="h-9 w-9 object-contain transition-all duration-300"
          />
        ) : (
          <img
            src="/prismavitae.png"
            alt="PrismaVitae"
            className="h-10 w-auto max-w-full object-contain transition-all duration-300"
          />
        )}
      </div>

      <div
        className={`flex flex-1 flex-col gap-1 overflow-y-auto ${
          collapsed ? 'px-0' : 'px-3'
        }`}
      >
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/app/'}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) => itemClasses(isActive, collapsed)}
          >
            {({ isActive }) => (
              <>
                {renderActiveBar(isActive)}
                <Icon name={item.icon} size={20} filled={isActive} />
                {!collapsed && (
                  <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div
        className={`flex flex-col gap-1 border-t border-outline-variant/60 py-3 ${
          collapsed ? 'px-0' : 'px-3'
        }`}
      >
        <NavLink
          to="/app/support"
          title={collapsed ? 'Soporte' : undefined}
          className={({ isActive }) => itemClasses(isActive, collapsed)}
        >
          {({ isActive }) => (
            <>
              {renderActiveBar(isActive)}
              <Icon name="contact_support" size={20} filled={isActive} />
              {!collapsed && <span className="overflow-hidden whitespace-nowrap">Soporte</span>}
            </>
          )}
        </NavLink>
        <button
          type="button"
          onClick={() => void signOut()}
          title={collapsed ? 'Cerrar Sesión' : undefined}
          className={`relative flex items-center rounded-lg font-label-md text-[12px] leading-[16px] tracking-[0.05em] text-secondary transition-colors duration-200 hover:bg-error-container/60 hover:text-error ${
            collapsed ? 'h-11 w-11 justify-center self-center' : 'gap-3 h-11 px-3'
          }`}
        >
          <Icon name="logout" size={20} />
          {!collapsed && <span className="overflow-hidden whitespace-nowrap">Cerrar Sesión</span>}
        </button>
      </div>
    </nav>
  );
}
