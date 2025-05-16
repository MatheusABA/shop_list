import useAuthStore from "@/src/stores/useAuthStore";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useProtectedRoute() {
    const { user, loading } = useAuthStore(state => ({
        user: state.user,
        loading: state.loading
    }));

    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === "(auth)";
        const inPublicGroup = segments[0] === "(public)";


        if (!user && !inPublicGroup) {
            // Redirecionamento para login caso não esteja autenticado
            router.replace('/(public)/login');
        } else if (user && inPublicGroup) {
            router.replace('/(auth)/')
        }
    }, [user, loading, segments, router]);
}