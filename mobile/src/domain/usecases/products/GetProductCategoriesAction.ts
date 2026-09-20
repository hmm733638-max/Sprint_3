export interface GetProductCategoriesAction {
  execute(): Promise<readonly string[]>;
}
