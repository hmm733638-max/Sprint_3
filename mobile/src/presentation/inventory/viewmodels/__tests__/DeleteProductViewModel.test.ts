import { describe, expect, it } from '@jest/globals';
import { DeleteProductAction } from '../../../../domain/usecases/products/DeleteProductAction';
import { DeleteProductViewModel } from '../DeleteProductViewModel';

describe('DeleteProductViewModel', () => {
  it('returns true after successful deletion', async () => {
    let receivedId: number | null = null;
    const action: DeleteProductAction = {
      async execute(productId) {
        receivedId = productId;
      },
    };
    const viewModel = new DeleteProductViewModel(action);

    await expect(viewModel.delete(7)).resolves.toBe(true);
    expect(receivedId).toBe(7);
    expect(viewModel.getState().status).toBe('idle');
  });
});
