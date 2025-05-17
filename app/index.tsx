// app/index.tsx
import useAuthStore from '@/src/stores/useAuthStore';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { user, loading } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use useEffect para evitar redirecionamentos prematuros
  useEffect(() => {
    if (!loading) {
      // Quando a autenticação terminar de carregar, marque como inicializado
      setIsInitialized(true);
    }
  }, [loading]);
  
  // Enquanto estiver carregando ou ainda não inicializado, mostre um carregador
  if (loading || !isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  // Agora podemos redirecionar com segurança
  if (user) {
    return <Redirect href="/(auth)/" />;
  } else {
    return <Redirect href="/(public)/login" />;
  }
}