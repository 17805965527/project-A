import { abdexClient } from './client';
import { userAddr } from '@lib/stores/user';
import Swal from 'sweetalert2';

export const connectKepler = async () => {
	// 判断是否安装了keplr钱包
	if (!window.keplr) {
		alert('Please install keplr extension');
		return;
	}
	console.log('Kepler钱包已安装');
	// 添加Abdex链
	await abdexClient.useKeplr({
		chainId: 'abdex',
		chainName: 'Abdex Network',
		stakeCurrency: {
			coinDenom: 'abd',
			coinMinimalDenom: 'uabd',
			coinDecimals: 6
		}
	});
	console.log('Abdex链已添加');
	// 获取keplr钱包地址
	if (!abdexClient.signer) {
		console.log('Kepler的signer未成功添加');
		return;
	}
	const address = (await abdexClient.signer.getAccounts())[0];
	console.log('当前地址为', address);
	// 将地址更新到store中
	userAddr.set(address.address);
	console.log('将地址更新到了store');
	// 通知
	Swal.fire({
		icon: 'success',
		title: 'Kepler Wallet Connected',
		showConfirmButton: false,
		timer: 2000
	});
};
