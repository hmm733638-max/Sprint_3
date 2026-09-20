export interface FakeStoreProductRatingDto {
  readonly rate: number;

  readonly count: number;
}

export interface FakeStoreProductDto {
  readonly id: number;

  readonly title: string;

  readonly price: number;

  readonly description: string;

  readonly category: string;

  readonly image: string;

  readonly rating: FakeStoreProductRatingDto;
}
