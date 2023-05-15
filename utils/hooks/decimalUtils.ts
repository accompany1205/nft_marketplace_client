export const decimalUtil = (point: number, value: number): number => {
    return Math.floor(value*Math.pow(10, point))/Math.pow(10, point);
}