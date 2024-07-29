import { camelToSentenceCase, debounce } from "../src/utils";

jest.useFakeTimers();

describe("Utils test", () => {
  jest.useFakeTimers();

  it("converts camelCase to sentence case with underscores", () => {
    expect(camelToSentenceCase("hello_world")).toBe("hello world");
    expect(camelToSentenceCase("camel_case_to_sentence_case")).toBe(
      "camel case to sentence case"
    );
  });

  it("handles empty string", () => {
    expect(camelToSentenceCase("")).toBe("");
  });

  it("handles strings with no underscores", () => {
    expect(camelToSentenceCase("helloWorld")).toBe("helloWorld");
  });

  it("handles multiple underscores", () => {
    expect(camelToSentenceCase("multiple__underscores")).toBe(
      "multiple  underscores"
    );
  });

  it("handles leading and trailing underscores", () => {
    expect(camelToSentenceCase("_leading")).toBe(" leading");
    expect(camelToSentenceCase("trailing_")).toBe("trailing ");
    expect(camelToSentenceCase("_both_ends_")).toBe(" both ends ");
  });

  it("calls the function after the specified delay", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(mockFn).toHaveBeenCalled();
  });

  it("calls the function only once if triggered multiple times within delay period", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    debouncedFn();
    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("calls the function with the correct arguments", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn("arg1", "arg2");
    jest.advanceTimersByTime(200);

    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2");
  });

  it("calls the function in the correct context", () => {
    const mockContext = { value: 42 };
    const mockFn = jest.fn(function () {
      return this.value;
    });
    const debouncedFn = debounce(mockFn.bind(mockContext), 200);

    debouncedFn();
    jest.advanceTimersByTime(200);

    expect(mockFn).toHaveReturnedWith(42);
  });
});
