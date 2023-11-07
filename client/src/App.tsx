import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import CryptTablePage from './pages/CryptTablePage/CryptTablePage';
import CryptocurrencyPage from './pages/CryptocurrencyPage/CryptocurrencyPage';
import Navbar from './components/UI/Navbar/Navbar';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '../../api-server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const trpc = createTRPCReact<AppRouter>();

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:4000/trpc',
                }),
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<CryptTablePage />} />
                        <Route path="/:id" element={<CryptocurrencyPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
