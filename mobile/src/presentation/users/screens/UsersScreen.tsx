import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { UsersViewModel } from '../viewmodels/UsersViewModel';

interface UsersScreenProps {
  readonly viewModel: UsersViewModel;
}

export function UsersScreen({ viewModel }: UsersScreenProps) {

  useEffect(() => {
    void viewModel.loadUsers();
  }, [viewModel]);

  // Estado 1: Cargando
  if (viewModel.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Cargando usuarios...</Text>
      </View>
    );
  }


  if (viewModel.error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 16 }}>{viewModel.error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={viewModel.users}

        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
  {item.firstName} {item.lastName}
</Text>
<Text style={{ color: '#666', marginTop: 4 }}>
  {item.email || 'Sin correo registrado'}
</Text>
            <Text style={{ color: '#666', marginTop: 4 }}>
              {item.email || 'Sin correo registrado'}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#999' }}>
            No hay usuarios registrados en el sistema.
          </Text>
        }
      />
    </View>
  );
}
