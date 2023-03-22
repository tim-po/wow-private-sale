export const randomNumberBetween = (
  min: number,
  max: number,
  include?: boolean,
  fix?: number,
) => {
  const value = include
    ? Math.random() * (max - min) + min
    : Math.random() * (max - min + 1) + min
  if (!fix) {
    return Math.floor(value)
  } else {
    return Number(value.toFixed(fix))
  }
}
