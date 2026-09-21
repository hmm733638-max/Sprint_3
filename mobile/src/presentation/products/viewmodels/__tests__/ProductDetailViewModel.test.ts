import { describe, expect, it } from '@jest/globals';
import { Product } from '../../../../domain/entities/Product';
import { ProductNotFoundError } from '../../../../domain/errors/ProductNotFoundError';
import { ProductsUnavailableError } from '../../../../domain/errors/ProductsUnavailableError';
import { ProductDetailViewModel } from '../ProductDetailViewModel';

const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 100,
  description: 'Laptop description',
  category: 'electronics',
  imageUrl: 'https://example.com/laptop.png',
  rating: { rate: 4.5, count: 10 },
};

describe('ProductDetailViewModel', () => {
  it('loads product detail', async () => {
    const viewModel = new ProductDetailViewModel({
      async execute(productId) {
        expect(productId).toBe(1);
        return product;
      },
    });

    await viewModel.load(1);
    expect(viewModel.getState().status).toBe('success');
    expect(viewModel.getState().product).toEqual(product);
  });

  it('applies local product update', async () => {
    const viewModel = new ProductDetailViewModel({
      async execute() {
        return product;
      },
    });
    await viewModel.load(1);
    viewModel.applyLocalUpdate({
      name: 'Laptop actualizada',
      price: 99.95,
      description: 'Descripción actualizada',
      category: 'computers',
    });

    expect(viewModel.getState().product).toEqual({
      ...product,
      name: 'Laptop actualizada',
      price: 99.95,
      description: 'Descripción actualizada',
      category: 'computers',
    });
  });

  it('shows not found state', async () => {
    const viewModel = new ProductDetailViewModel({
      async execute() {
        throw new ProductNotFoundError(999);
      },
    });
    await viewModel.load(999);
    expect(viewModel.getState().status).toBe('notFound');
  });

  it('shows unavailable state', async () => {
    const viewModel = new ProductDetailViewModel({
      async execute() {
        throw new ProductsUnavailableError();
      },
    });
    await viewModel.load(1);
    expect(viewModel.getState().status).toBe('unavailable');
  });
});
