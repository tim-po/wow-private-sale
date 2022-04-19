/* eslint-disable no-undef */
export const wei2eth = (val) => {
    if (val) {
        return BigInt(val) / BigInt(1000000000000000000);
    }
    return BigInt(0);
};
