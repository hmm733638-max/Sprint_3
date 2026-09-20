import { describe, expect, it } from '@jest/globals';

import { Product } from '../../../../domain/entities/Product';

import { ProductsUnavailableError } from '../../../../domain/errors/ProductsUnavailableError';

import { CatalogViewModel } from '../CatalogViewModel';

const laptop: Product = {
  id: 1,

  name: 'Laptop',

  price: 100,

  description: 'Laptop description',

  category: 'electronics',

  imageUrl: 'https://example.com/laptop.png',

  rating: {
    rate: 4.5,

    count: 10,
  },
};

const jacket: Product = {
  id: 2,

  name: 'Jacket',

  price: 50,

  description: 'Jacket description',

  category: "men's clothing",

  imageUrl: 'https://example.com/jacket.png',

  rating: {
    rate: 4,

    count: 20,
  },
};

describe('CatalogViewModel', () => {
  it('loads products and categories', async () => {
    const viewModel = new CatalogViewModel(
      {
        async execute() {
          return [laptop, jacket];
        },
      },

      {
        async execute() {
          return ['electronics', "men's clothing"];
        },
      },

      {
        async execute() {
          return [];
        },
      },
    );

    await viewModel.load();

    const state = viewModel.getState();

    expect(state.status).toBe('success');

    expect(state.products).toEqual([laptop, jacket]);

    expect(state.visibleProducts).toEqual([laptop, jacket]);

    expect(state.categories).toEqual(['electronics', "men's clothing"]);
  });

  it('filters products by search text', async () => {
    const viewModel = new CatalogViewModel(
      {
        async execute() {
          return [laptop, jacket];
        },
      },

      {
        async execute() {
          return [];
        },
      },

      {
        async execute() {
          return [];
        },
      },
    );

    await viewModel.load();

    viewModel.setSearchQuery('lap');

    const state = viewModel.getState();

    expect(state.visibleProducts).toEqual([laptop]);
  });

  it('loads products from a selected category', async () => {
    const viewModel = new CatalogViewModel(
      {
        async execute() {
          return [laptop, jacket];
        },
      },

      {
        async execute() {
          return ['electronics', "men's clothing"];
        },
      },

      {
        async execute(category) {
          if (category === 'electronics') {
            return [laptop];
          }

          return [];
        },
      },
    );

    await viewModel.load();

    await viewModel.selectCategory('electronics');

    const state = viewModel.getState();

    expect(state.selectedCategory).toBe('electronics');

    expect(state.products).toEqual([laptop]);

    expect(state.visibleProducts).toEqual([laptop]);
  });

  it('moves to empty state when search has no results', async () => {
    const viewModel = new CatalogViewModel(
      {
        async execute() {
          return [laptop];
        },
      },

      {
        async execute() {
          return [];
        },
      },

      {
        async execute() {
          return [];
        },
      },
    );

    await viewModel.load();

    viewModel.setSearchQuery('producto inexistente');

    expect(viewModel.getState().status).toBe('empty');

    expect(viewModel.getState().visibleProducts).toEqual([]);
  });

  it('shows unavailable state when products cannot be loaded', async () => {
    const viewModel = new CatalogViewModel(
      {
        async execute() {
          throw new ProductsUnavailableError();
        },
      },

      {
        async execute() {
          return [];
        },
      },

      {
        async execute() {
          return [];
        },
      },
    );

    await viewModel.load();

    expect(viewModel.getState().status).toBe('unavailable');

    expect(viewModel.getState().errorMessage).not.toBeNull();
  });
});
