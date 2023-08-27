// 编码rest的请求参数 / -> __, : -> ..
export const EncodeRestStr = (str: string) => {
	return str.replace(/\//g, '__').replace(/:/g, '..');
};
