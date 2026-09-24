import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartItem } from '../../../domain/entities/CartItem';

interface CartItemCardProps {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.product.imageUrl }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.product.name}
        </Text>
        <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>
        <View style={styles.controls}>
          <TouchableOpacity onPress={onDecrement} style={styles.btnQty}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={onIncrement} style={styles.btnQty}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.btnRemove}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: { width: 60, height: 60, borderRadius: 6 },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 14, fontWeight: 'bold', color: '#1a1a1a' },
  price: { fontSize: 14, color: '#0066cc', marginVertical: 4 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  btnQty: {
    width: 28,
    height: 28,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  btnText: { fontSize: 16, fontWeight: 'bold' },
  qtyText: { marginHorizontal: 12, fontSize: 14, fontWeight: '600' },
  btnRemove: { padding: 8 },
  removeText: { color: '#dc3545', fontSize: 16, fontWeight: 'bold' },
});
