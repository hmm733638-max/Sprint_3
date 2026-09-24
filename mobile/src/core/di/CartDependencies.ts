import { AsyncStorageCartLocalDataSource } from '../../data/datasources/local/cart/AsyncStorageCartLocalDataSource';
import { CartRepositoryImpl } from '../../data/repositories/CartRepositoryImpl';
import { GetCartUseCase } from '../../domain/usecases/cart/GetCartUseCase';
import { AddToCartUseCase } from '../../domain/usecases/cart/AddToCartUseCase';
import { UpdateCartItemQuantityUseCase } from '../../domain/usecases/cart/UpdateCartItemQuantityUseCase';
import { RemoveFromCartUseCase } from '../../domain/usecases/cart/RemoveFromCartUseCase';
import { CartViewModel } from '../../presentation/cart/viewmodels/CartViewModel';

export class CartDependencies {
  private static cartLocalDataSource = new AsyncStorageCartLocalDataSource();
  private static cartRepository = new CartRepositoryImpl(this.cartLocalDataSource);

  static provideGetCartUseCase(): GetCartUseCase {
    return new GetCartUseCase(this.cartRepository);
  }

  static provideAddToCartUseCase(): AddToCartUseCase {
    return new AddToCartUseCase(this.cartRepository);
  }

  static provideUpdateCartItemQuantityUseCase(): UpdateCartItemQuantityUseCase {
    return new UpdateCartItemQuantityUseCase(this.cartRepository);
  }

  static provideRemoveFromCartUseCase(): RemoveFromCartUseCase {
    return new RemoveFromCartUseCase(this.cartRepository);
  }

  static provideCartViewModel(): CartViewModel {
    return new CartViewModel(
      this.provideGetCartUseCase(),
      this.provideAddToCartUseCase(),
      this.provideUpdateCartItemQuantityUseCase(),
      this.provideRemoveFromCartUseCase(),
    );
  }
}
