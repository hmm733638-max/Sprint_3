import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { CartItemCard } from '../components/CartItemCard';
import { CartViewModel } from '../viewmodels/CartViewModel';

interface CartScreenProps {
  viewModel: CartViewModel;
}

export const CartScreen: React.FC<CartScreenProps> = ({ viewModel }) => {
  const { state, loadCart, handleUpdateQuantity, handleRemoveItem } = viewModel.useCartState();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  if (state.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mi Carrito</Text>
      {state.items.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptySub}>Explora el catálogo y agrega artículos a tu carrito.</Text>
        </View>
      ) : (
        <FlatList
          data={state.items}
          keyExtractor={(item) => item.product.id.toString()}
          renderItem={({ item }) => (
            <CartItemCard
              item={item}
              onIncrement={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
              onDecrement={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
              onRemove={() => handleRemoveItem(item.product.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});
