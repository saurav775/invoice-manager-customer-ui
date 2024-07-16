import { camelToSentenceCase, debounce } from "../src/utils";

jest.useFakeTimers();

describe("<Utils>", () => {
  it("snakeToSentenceCase check", () => {
    const sampleValue = "abc_test";
    const expectedOutput = "abc test";
    expect(camelToSentenceCase(sampleValue)).toEqual(expectedOutput);
  });

  it("debounce check", () => {
    let count = 0;
    const sampleFn = () => count++;
    const debounced = debounce(sampleFn, 300);
    debounced();
    debounced();
    debounced();
    debounced();

    jest.runAllTimers();

    expect(count).toEqual(1);
  });
});
