export interface ProductRating {
  readonly rate: number;

  readonly count: number;
}

export interface Product {
  readonly id: number;

  readonly name: string;

  readonly price: number;

  readonly description: string;

  readonly category: string;

  readonly imageUrl: string;

  readonly rating: ProductRating;
}
