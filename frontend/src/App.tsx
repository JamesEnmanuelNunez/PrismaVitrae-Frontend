import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { AppLayout } from './pages/AppLayout';
import { ScannerView } from './features/scanner/ScannerView';
import { DataTableView } from './features/management/DataTableView';
import { SettingsView } from './features/settings/SettingsView';
import { Login } from './features/auth/Login';
import { ConfirmEmail } from './features/auth/ConfirmEmail';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary font-body-md">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/confirm" element={<ConfirmEmail />} />
        <Route path="/app/*" element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/" element={<ScannerView />} />
                <Route path="/data-table" element={<DataTableView />} />
                <Route path="/settings" element={<SettingsView />} />
                <Route path="/support" element={<div className="p-10"><h2 className="font-headline-lg text-[32px] leading-[40px] text-on-surface">Soporte</h2></div>} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
