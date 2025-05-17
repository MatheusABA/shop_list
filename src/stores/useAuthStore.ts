import { supabase } from '@/src/services/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;

    // Ações
    setSession: (session: Session | null) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    signIn: (email: string, password: string) => Promise<{ error: any}>;
    signUp: (email: string, password: string) => Promise<{ error: any}>;
    signOut: () => Promise<void>;

    // Inicializando
    initialize: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    session: null,
    loading: true,

    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),

    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (!error) {
            set({ user: data.user, session: data.session });
        }
        return { error };
    },

  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    return { error };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  initialize: async () =>{
    set({ loading: true });
    
    // Verificar sessão atual
    const { data: { session } } = await supabase.auth.getSession();
    set({ 
      session,
      user: session?.user || null,
      loading: false 
    });
    
    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        set({ 
          session,
          user: session?.user || null 
        });
      }
    );
    
    // Retornar função de limpeza (cleanup)
    return () => {
      subscription.unsubscribe();
    };
  }

}));

export default useAuthStore