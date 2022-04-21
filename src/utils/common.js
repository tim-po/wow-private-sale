/* eslint-disable no-undef */
export const wei2eth = (val) => {
    if (val) {
        console.log()
        return Number((BigInt(val) * BigInt(100)) / BigInt(1000000000000000000)) / 100;
    }
    return BigInt(0);
};
