import { Client } from '@lib/ts-client';

export const abdexClient = new Client({
	apiURL: 'http://localhost:1317',
	rpcURL: 'http://localhost:26657',
	prefix: 'abdex'
});
