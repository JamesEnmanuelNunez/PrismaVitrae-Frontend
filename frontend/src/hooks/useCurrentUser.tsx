import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface CurrentUser {
  name: string;
  email: string;
  initials: string;
  avatarUrl: string | null;
}

interface CurrentUserContextValue {
  user: CurrentUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const CurrentUserContext = createContext<CurrentUserContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
});

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function readMetadata(user: User, keys: string[]): string | null {
  const metadata = user.user_metadata ?? {};
  for (const key of keys) {
    const value = metadata[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

function buildCurrentUser(user: User | null): CurrentUser | null {
  if (!user) return null;

  const email = user.email ?? '';
  const fullName =
    readMetadata(user, ['full_name', 'name', 'display_name']) ??
    [readMetadata(user, ['given_name']), readMetadata(user, ['family_name'])]
      .filter(Boolean)
      .join(' ');

  const name = fullName
    ? titleCase(fullName)
    : titleCase(email.split('@')[0]?.replace(/[._-]+/g, ' ') ?? '') || 'Usuario';

  const parts = name.split(/\s+/).filter(Boolean);
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase() ||
        email.slice(0, 2).toUpperCase() ||
        'U';

  const avatarUrl = readMetadata(user, ['avatar_url', 'picture']);

  return { name, email, initials, avatarUrl };
}

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(buildCurrentUser(session?.user ?? null));
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(buildCurrentUser(session?.user ?? null));
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <CurrentUserContext.Provider value={{ user, loading, signOut }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
