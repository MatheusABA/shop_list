// src/hooks/useProtectedRoute.ts
import useAuthStore from "@/src/stores/useAuthStore";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useRef } from "react";

export function useProtectedRoute() {
    const { user, loading } = useAuthStore(state => ({
        user: state.user,
        loading: state.loading
    }));

    const segments = useSegments();
    const router = useRouter();
    
    // Use useRef para evitar loops de renderização
    const hasNavigated = useRef(false);
    
    useEffect(() => {
        // Não faça nada se ainda estiver carregando
        if (loading) return;
        
        // Evite navegações repetidas
        if (hasNavigated.current) return;
        
        const inAuthGroup = segments[0] === "(auth)";
        const inPublicGroup = segments[0] === "(public)";
        
        // Navegue apenas se estiver no grupo errado
        if (!user && !inPublicGroup) {
            hasNavigated.current = true;
            router.replace('/(public)/login');
        } else if (user && inPublicGroup) {
            hasNavigated.current = true;
            router.replace('/(auth)/');
        }
        
        // Resete o flag quando os segmentos mudarem
        return () => {
            hasNavigated.current = false;
        };
    }, [user, loading, segments]);
}