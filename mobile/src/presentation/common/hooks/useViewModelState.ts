import { useSyncExternalStore } from 'react';

interface ObservableViewModel<TState> {
  readonly getState: () => TState;

  readonly subscribe: (listener: () => void) => () => void;
}

export function useViewModelState<TState>(viewModel: ObservableViewModel<TState>): TState {
  return useSyncExternalStore(viewModel.subscribe, viewModel.getState, viewModel.getState);
}
