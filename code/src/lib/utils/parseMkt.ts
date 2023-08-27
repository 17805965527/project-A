interface MktInfo {
	market: string;
	sort: 'spot' | 'perp' | 'fut';
	base: string;
	quote: string;
	margin?: string;
	expiry?: string;
}

export function parseMkt(mkt: string): MktInfo {
	const parts = mkt.split(/[:/-]/);
	switch (parts.length) {
		case 2: // 现货
			return { market: mkt, sort: 'spot', base: parts[0], quote: parts[1] };
		case 3: // 永续合约
			return { market: mkt, sort: 'perp', base: parts[0], quote: parts[1], margin: parts[2] };
		case 4: // 期货
			return { market: mkt, sort: 'fut', base: parts[0], quote: parts[1], margin: parts[2], expiry: parts[3] };
		default:
			throw new Error(`Invalid symbol format: ${mkt}`);
	}
}
