export interface GetCryptocurrenciesParams {
    limit?: number;
    offset?: number;
    search?: string;
}

export interface GetCryptocurrencyHistoryParams {
    id: string;
    interval: string;
    start: string;
    end: string;
}

export interface GetMultipleCryptocurrenciesParams {
    ids: string;
}