export interface CartCleanupRepository {
  clearCart(): Promise<void>;
}
