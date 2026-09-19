export type ViewModelStateListener = () => void;

export class ViewModelStore<TState> {
  private state: TState;

  private readonly listeners = new Set<ViewModelStateListener>();

  constructor(initialState: TState) {
    this.state = initialState;
  }

  readonly getSnapshot = (): TState => {
    return this.state;
  };

  readonly subscribe = (listener: ViewModelStateListener): (() => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  setState(state: TState): void {
    this.state = state;

    this.notify();
  }

  patchState(patch: Partial<TState>): void {
    this.state = {
      ...this.state,
      ...patch,
    };

    this.notify();
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
}
