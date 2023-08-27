interface Mkt {
	market: string;
	oraclePcSymbol: string;
}
export const clobMkts: Record<string, Mkt> = {
	'ETH/USDa': {
		market: 'ETH/USDa',
		oraclePcSymbol: 'ETH/USDa'
	},
	'ETH/USDa:USDa': {
		market: 'ETH/USDa:USDa',
		oraclePcSymbol: 'ETH/USDa'
	},
	'ES.CME/USDa:USDa-230915': {
		market: 'ES.CME/USDa:USDa-230915',
		oraclePcSymbol: 'ES.CME/USDa:USDa-230915'
	},
	'GC.CMX/USDa:USDa-230829': {
		market: 'GC.CMX/USDa:USDa-230829',
		oraclePcSymbol: 'GC.CMX/USDa:USDa-230829'
	},
	'NQ.CME/USDa:USDa-230915': {
		market: 'NQ.CME/USDa:USDa-230915',
		oraclePcSymbol: 'NQ.CME/USDa:USDa-230915'
	}
};
