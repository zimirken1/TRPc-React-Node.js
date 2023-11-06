import axios, {AxiosResponse} from 'axios';
import { ICryptResponse, ISingleCryptResponse, IHistoryResponse } from '../types/crypt.js';
import { GetCryptocurrenciesParams, GetMultipleCryptocurrenciesParams, GetCryptocurrencyHistoryParams} from '../types/api.js'

const BASE_URL = 'https://api.coincap.io';

export async function getCryptocurrencies(
    params: GetCryptocurrenciesParams
): Promise<ICryptResponse> {
    const response: AxiosResponse<ICryptResponse> = await axios.get(`${BASE_URL}/v2/assets`, {
        params,
    });
    return response.data;
}

export async function getSingleCryptocurrency(id: string): Promise<ISingleCryptResponse> {
    const response: AxiosResponse<ISingleCryptResponse> = await axios.get(`${BASE_URL}/v2/assets/${id}`);
    return response.data
}

export async function getCryptocurrencyHistory(
    params: GetCryptocurrencyHistoryParams
): Promise<IHistoryResponse> {
    const response: AxiosResponse<IHistoryResponse> = await axios.get(`${BASE_URL}/v2/assets/${params.id}/history`, {
        params: {
            interval: params.interval,
            start: params.start,
            end: params.end,
        },
    });
    return response.data;
}

export async function getMultipleCryptocurrencies(
    params: GetMultipleCryptocurrenciesParams
): Promise<ICryptResponse> {
    const response: AxiosResponse<ICryptResponse> = await axios.get(`${BASE_URL}/v2/assets`, {
        params: {ids: params.ids},
    });
    return response.data;
}

