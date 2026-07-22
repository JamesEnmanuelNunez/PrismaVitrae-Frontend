import { NavLink } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { useSidebar } from '../../pages/AppLayout';

const mainNavItems = [
  { to: '/app/', icon: 'cloud_upload', label: 'Subir Documentos', filled: false },
  { to: '/app/data-table', icon: 'table_chart', label: 'Tabla de Datos', filled: false },
  { to: '/app/settings', icon: 'settings', label: 'Configuración', filled: true },
];

const footerNavItems = [
  { to: '/app/support', icon: 'contact_support', label: 'Soporte' },
  { to: '/sign-out', icon: 'logout', label: 'Cerrar Sesión' },
];

export function SideNavBar() {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <nav
      className={`group/nav bg-surface-container-low h-screen fixed left-0 top-0 border-r border-outline-variant flex flex-col py-4 z-20 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Logo + Toggle */}
      <div className={`mb-6 relative transition-all duration-300 ${collapsed ? 'px-3 flex justify-center' : 'px-4'}`}>
        <img
          src={collapsed ? '/logo.png' : '/prismavitae.png'}
          alt="PrismaVitae"
          className={`rounded-DEFAULT object-cover transition-all duration-300 ${
            collapsed ? 'w-12 h-12' : 'w-full h-14'
          }`}
        />
        {/* Hover toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200 cursor-pointer hover:bg-surface-container-highest"
          style={{ [collapsed ? 'right' : 'right']: '-12px' }}
        >
          <Icon
            name={collapsed ? 'chevron_right' : 'chevron_left'}
            size={14}
            className="text-on-surface-variant"
          />
        </button>
      </div>

      {/* Main Navigation */}
      <div className={`flex-1 flex flex-col gap-1 transition-all duration-300 ${collapsed ? 'px-3' : 'px-4'}`}>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/app/'}
            className={({ isActive }) =>
              `flex items-center rounded-DEFAULT font-medium transition-all duration-300 snap-none ${
                collapsed ? 'justify-center py-3 px-0' : 'gap-4 px-4 py-4'
              } ${
                isActive
                  ? 'text-primary font-bold border-r-4 border-primary bg-secondary-container/20'
                  : 'text-secondary hover:bg-surface-container-high'
              }`
            }
          >
            <Icon name={item.icon} size={20} filled={item.filled} />
            {!collapsed && (
              <span className="font-label-md text-[12px] leading-[16px] tracking-[0.05em] whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className={`flex flex-col gap-1 transition-all duration-300 ${collapsed ? 'px-3' : 'px-4'}`}>
        {footerNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={`flex items-center rounded-DEFAULT text-secondary font-medium hover:bg-surface-container-high transition-all duration-300 snap-none ${
              collapsed ? 'justify-center py-3 px-0' : 'gap-4 px-4 py-4'
            }`}
          >
            <Icon name={item.icon} size={20} />
            {!collapsed && (
              <span className="font-label-md text-[12px] leading-[16px] tracking-[0.05em] whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
