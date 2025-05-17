// app/_layout.tsx
import { useAuthInitialize } from '@/src/services/hooks/useAuthInitialize';
import useAuthStore from '@/src/stores/useAuthStore';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  // Use um estado local para controlar quando é seguro renderizar o router protection
  const [isReady, setIsReady] = useState(false);
  
  // Inicialize a autenticação
  useAuthInitialize();
  
  // Aguarde a montagem do componente antes de habilitar a proteção de rotas
  useEffect(() => {
    // Aguarde um ciclo de renderização antes de ativar
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Obtenha o estado de carregamento
  const loading = useAuthStore((state) => state.loading);
  
  // Mostre o indicador de carregamento enquanto estiver carregando
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  // Renderize o Slot, que é necessário para o Expo Router funcionar
  return <Slot />;
}