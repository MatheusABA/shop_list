import useAuthStore from "@/src/stores/useAuthStore";
import { useEffect } from "react";



export function useAuthInitialize() {
    const initialize = useAuthStore(state => state.initialize);

    useEffect(() => {
        const unsubscribe = initialize();

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [initialize]);
}