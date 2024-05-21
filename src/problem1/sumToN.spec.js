import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./sumToN";

describe("Check sumation functions", () => {
    it('Can sum up positive integers (1)', () => {
        expect(sum_to_n_a(5)).toBe(15);
        expect(sum_to_n_b(5)).toBe(15);
        expect(sum_to_n_c(5)).toBe(15);
    });

    it('Can sum up positive integers (2)', () => {
        expect(sum_to_n_a(100)).toBe(5050);
        expect(sum_to_n_b(100)).toBe(5050);
        expect(sum_to_n_c(100)).toBe(5050);
    });

    it('Can sum up zero', () => {
        expect(sum_to_n_a(0)).toBe(0);
        expect(sum_to_n_b(0)).toBe(0);
        expect(sum_to_n_c(0)).toBe(0);
    });

    it('Can sum up negative integers (1)', () => {
        expect(sum_to_n_a(-1)).toBe(-1);
        expect(sum_to_n_b(-1)).toBe(-1);
        expect(sum_to_n_c(-1)).toBe(-1);
    });

    it('Can sum up negative integers (2)', () => {
        expect(sum_to_n_a(-5)).toBe(-15);
        expect(sum_to_n_b(-5)).toBe(-15);
        expect(sum_to_n_c(-5)).toBe(-15);
    });
});
    