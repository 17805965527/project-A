import { readable, derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { abdexClient } from '@lib/abdex/client';
import type { OraclePrice } from '@lib/ts-client/abdex.oracle/rest';
import type { V1Beta1Metadata } from '@lib/ts-client/cosmos.bank.v1beta1/rest';
import type { StbconStbcon } from '@lib/ts-client/abdex.stbcon/rest';
import { userNow, userMkt, userAddr } from './user';
import { clobMkts } from './config';

// 区块相关信息
export const abdexBlock = readable(
	{
		height: '0'
	},
	function start(set) {
		const interval = setInterval(async () => {
			abdexClient.CosmosBaseTendermintV1Beta1.query
				.serviceGetLatestBlock()
				.then((res) => {
					if (res.data.block?.header?.height) {
						set({ height: res.data.block?.header?.height });
					}
				})
				.catch((error) => {
					console.error('getHeight', error);
				});
		}, 1000);

		return function stop() {
			clearInterval(interval);
		};
	}
);
// oracle所有价格信息
export const oraclePcs = readable<OraclePrice[]>([], function start(set) {
	const interval = setInterval(async () => {
		abdexClient.AbdexOracle.query
			.queryPriceAll()
			.then((res) => {
				if (res.data.price) {
					set(res.data.price);
				}
			})
			.catch((error) => {
				console.error('getOraclePcs', error);
			});
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
// oracle当前标的价格信息
export const oraclePc = derived([userMkt, oraclePcs], ([$userMkt, $oraclePcs]) => {
	let orcleSymbol = clobMkts[$userMkt].oraclePcSymbol;
	return $oraclePcs.find((item) => item.market === orcleSymbol);
});
// oracle格式化后的预言机价格
export const oracleFormattedPc = derived(oraclePc, ($oraclePc) => {
	if ($oraclePc) {
		let formattedPc = (Number($oraclePc.answer) / Math.pow(10, 6)).toFixed(2);
		return formattedPc;
	}
});
// 期货倒计时
export const timeLeft = derived([userNow, oraclePc], ([$userNow, $oraclePc]) => {
	if ($oraclePc?.expiry) {
		let countdown = Number($oraclePc.expiry) - $userNow;
		return {
			days: Math.floor(countdown / (60 * 60 * 24)),
			hours: Math.floor((countdown / (60 * 60)) % 24),
			minutes: Math.floor((countdown / 1 / 60) % 60)
		};
	}
});
// 获取链的DenomsMetadata
export const denomsMetadata = derived<Writable<string>, V1Beta1Metadata[]>(userAddr, ($userAddr) => {
	const _ = setInterval(async () => {
		if ($userAddr) {
			abdexClient.CosmosBankV1Beta1.query
				.queryDenomsMetadata()
				.then((res) => {
					if (res.data.metadatas) {
						console.log('getDenomsMetadata:', res.data.metadatas);
						return res.data.metadatas;
					} else {
						return [];
					}
				})
				.catch((error) => {
					console.log('getDenomsMetadata error:', error);
				});
		}
	}, 1000);
});
// 获取链的Stbcon
export const stbcon = readable<StbconStbcon>({}, function start(set) {
	const interval = setInterval(async () => {
		abdexClient.AbdexStbcon.query
			.queryStbcon()
			.then((res) => {
				console.log('getStbcon:', res.data);

				if (res.data.Stbcon) {
					set(res.data.Stbcon);
				}
			})
			.catch((error) => {
				console.error('getStbcon', error);
			});
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

// 获取链的frozen
export const frozen = writable(0);
