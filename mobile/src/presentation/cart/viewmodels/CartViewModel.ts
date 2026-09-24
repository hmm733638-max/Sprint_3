import { useState, useCallback } from 'react';
import { GetCartUseCase } from '../../../domain/usecases/cart/GetCartUseCase';
import { AddToCartUseCase } from '../../../domain/usecases/cart/AddToCartUseCase';
import { UpdateCartItemQuantityUseCase } from '../../../domain/usecases/cart/UpdateCartItemQuantityUseCase';
import { RemoveFromCartUseCase } from '../../../domain/usecases/cart/RemoveFromCartUseCase';
import { Product } from '../../../domain/entities/Product';
import { CartItem } from '../../../domain/entities/CartItem';
import { CartUiState } from '../state/CartUiState';

function calculateTotals(items: CartItem[]) {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  return { subtotal, total: subtotal };
}

function useCartStateHook(
  getCartUseCase: GetCartUseCase,
  addToCartUseCase: AddToCartUseCase,
  updateCartItemQuantityUseCase: UpdateCartItemQuantityUseCase,
  removeFromCartUseCase: RemoveFromCartUseCase,
) {
  const [state, setState] = useState<CartUiState>({
    items: [],
    subtotal: 0,
    total: 0,
    isLoading: false,
    errorMessage: null,
  });

  const loadCart = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, errorMessage: null }));
    try {
      const items = await getCartUseCase.execute();
      const { subtotal, total } = calculateTotals(items);
      setState({ items, subtotal, total, isLoading: false, errorMessage: null });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al cargar el carrito';
      setState((prev) => ({ ...prev, isLoading: false, errorMessage: message }));
    }
  }, [getCartUseCase]);

  const handleAddToCart = useCallback(
    async (product: Product, quantity = 1) => {
      setState((prev) => ({ ...prev, isLoading: true, errorMessage: null }));
      try {
        const items = await addToCartUseCase.execute(product, quantity);
        const { subtotal, total } = calculateTotals(items);
        setState({ items, subtotal, total, isLoading: false, errorMessage: null });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error al agregar producto';
        setState((prev) => ({ ...prev, isLoading: false, errorMessage: message }));
      }
    },
    [addToCartUseCase],
  );

  const handleUpdateQuantity = useCallback(
    async (productId: string | number, quantity: number) => {
      if (quantity <= 0) {
        return;
      }
      setState((prev) => ({ ...prev, isLoading: true, errorMessage: null }));
      try {
        const items = await updateCartItemQuantityUseCase.execute(productId, quantity);
        const { subtotal, total } = calculateTotals(items);
        setState({ items, subtotal, total, isLoading: false, errorMessage: null });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error al actualizar cantidad';
        setState((prev) => ({ ...prev, isLoading: false, errorMessage: message }));
      }
    },
    [updateCartItemQuantityUseCase],
  );

  const handleRemoveItem = useCallback(
    async (productId: string | number) => {
      setState((prev) => ({ ...prev, isLoading: true, errorMessage: null }));
      try {
        const items = await removeFromCartUseCase.execute(productId);
        const { subtotal, total } = calculateTotals(items);
        setState({ items, subtotal, total, isLoading: false, errorMessage: null });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error al eliminar producto';
        setState((prev) => ({ ...prev, isLoading: false, errorMessage: message }));
      }
    },
    [removeFromCartUseCase],
  );

  return {
    state,
    loadCart,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
  };
}

export class CartViewModel {
  constructor(
    private readonly getCartUseCase: GetCartUseCase,
    private readonly addToCartUseCase: AddToCartUseCase,
    private readonly updateCartItemQuantityUseCase: UpdateCartItemQuantityUseCase,
    private readonly removeFromCartUseCase: RemoveFromCartUseCase,
  ) {}

  public useCartState() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useCartStateHook(
      this.getCartUseCase,
      this.addToCartUseCase,
      this.updateCartItemQuantityUseCase,
      this.removeFromCartUseCase,
    );
  }
}
