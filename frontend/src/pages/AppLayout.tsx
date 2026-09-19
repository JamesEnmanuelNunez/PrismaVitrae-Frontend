import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { SideNavBar } from '../components/layout/SideNavBar';
import { CurrentUserProvider } from '../hooks/useCurrentUser';

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) setCollapsed(true);
  }, []);

  return (
    <CurrentUserProvider>
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex">
          <SideNavBar />
          <div
            className={`flex-1 min-h-screen bg-background overflow-y-auto transition-all duration-300 ease-in-out ${
              collapsed ? 'ml-[72px]' : 'ml-64'
            }`}
          >
            {children}
          </div>
        </div>
      </SidebarContext.Provider>
    </CurrentUserProvider>
  );
}
