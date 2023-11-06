import {z} from 'zod';
import {initTRPC} from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config();

import {
    getCryptocurrencies,
    getCryptocurrencyHistory,
    getMultipleCryptocurrencies,
    getSingleCryptocurrency
} from "./http/cryptService.js";

const t = initTRPC.create();

export const publicProcedure = t.procedure;

const appRouter = t.router({
    getCryptocurrencies: publicProcedure
        .input(z.object({limit: z.number(), offset: z.number(), search: z.string().optional()}))
        .query(async (opts) => {
            const {limit, offset, search} = opts.input;
            const data = await getCryptocurrencies({limit, offset, search});
            return data;
        }),
    getSingleCryptocurrency: publicProcedure
        .input(z.object({id: z.string()}))
        .query(async (opts) => {
            const {id} = opts.input;
            const cryptocurrency = await getSingleCryptocurrency(id);
            return cryptocurrency;
        }),
    getCryptocurrencyHistory: publicProcedure
        .input(z.object({id: z.string(), interval: z.string(), start: z.string(), end: z.string()}))
        .query(async (opts) => {
            const {id, interval, start, end} = opts.input;
            const history = await getCryptocurrencyHistory({id, interval, start, end});
            return history;
        }),
    getMultipleCryptocurrencies: publicProcedure
        .input(z.object({ids: z.string()}))
        .query(async (opts) => {
            const {ids} = opts.input;
            const data = await getMultipleCryptocurrencies({ids});
            return data;
        }),
});

const app = express();
const port = process.env.PORT || 4000;

app.use(cors())

app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
}));

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});


export type AppRouter = typeof appRouter;
