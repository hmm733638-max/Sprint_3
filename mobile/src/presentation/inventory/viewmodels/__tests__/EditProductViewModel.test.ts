import { describe, expect, it } from '@jest/globals';
import { Product } from '../../../../domain/entities/Product';
import { UpdateProductAction } from '../../../../domain/usecases/products/UpdateProductAction';
import { EditProductViewModel } from '../EditProductViewModel';

const product: Product = {
  id: 7,
  name: 'Laptop',
  price: 999.99,
  description: 'Laptop original',
  category: 'electronics',
  imageUrl: 'https://example.com/laptop.png',
  rating: { rate: 4.5, count: 20 },
};

describe('EditProductViewModel', () => {
  it('preloads current product data', () => {
    const action: UpdateProductAction = {
      async execute(_productId, data) {
        return data;
      },
    };
    const viewModel = new EditProductViewModel(action);
    viewModel.initialize(product);

    expect(viewModel.getState()).toMatchObject({
      productId: 7,
      name: 'Laptop',
      price: '999.99',
      description: 'Laptop original',
      category: 'electronics',
    });
  });

  it('does not update invalid data', async () => {
    let executed = false;
    const action: UpdateProductAction = {
      async execute(_productId, data) {
        executed = true;
        return data;
      },
    };
    const viewModel = new EditProductViewModel(action);
    viewModel.initialize(product);
    viewModel.setPrice('abc');

    await expect(viewModel.submit()).resolves.toBeNull();
    expect(executed).toBe(false);
    expect(viewModel.getState().priceError).not.toBeNull();
  });

  it('returns locally edited data after successful update', async () => {
    const action: UpdateProductAction = {
      async execute(_productId, data) {
        return data;
      },
    };
    const viewModel = new EditProductViewModel(action);
    viewModel.initialize(product);
    viewModel.setPrice('99.95');

    await expect(viewModel.submit()).resolves.toEqual({
      name: 'Laptop',
      price: 99.95,
      description: 'Laptop original',
      category: 'electronics',
    });
  });
});
