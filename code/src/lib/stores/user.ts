// 定义用户选择的数据
import { writable, readable } from 'svelte/store';

export const userAddr = writable('');
export const userMkt = writable('ETH/USDa');
export const userNow = readable(Date.now() / 1000, function start(set) {
	const interval = setInterval(() => {
		set(Date.now() / 1000);
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
