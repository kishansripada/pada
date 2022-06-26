import { createClient } from '@urql/svelte';

const url = 'https://graphql.fauna.com/graphql'

export default createClient({
    url,

    fetchOptions: () => {
        const token = import.meta.env.VITE_PUBLIC_FAUNA_KEY;
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
        };
    },
});

export const clientWithCookieSession = token => createClient({
    url,
    fetchOptions: () => {
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
        };
    },
});
