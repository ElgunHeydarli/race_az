export type BaseResponseType<T> = {
  status: string;
  data: T;
};

export type BaseEntityType = {
  id: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntityType;

export interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export type ImageProps = {
  image: string;
  image_alt: string;
};

export type BasketStatus = 'Yoxdur' | 'Az sayda' | 'Var';
