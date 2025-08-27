export type CacheType<T> = {
     data: T;
     time: number;
};

export type ResponseCurrencyItem = {
     target: string;
     rate: string;
};

export type ResponseType = {
     base: string;
     targets: ResponseCurrencyItem[];
};

export type TypeUserData = {
     user_id: string;
     base_currency: string;
     favorites: string[];
     created_at: string;
     updated_at: string;
};
