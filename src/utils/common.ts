export const truncate = (str: string): string => {
	return str.length > 0
		? str.substr(0, 5) + "..." + str.substr(str.length - 5, str.length - 1)
		: str;
}