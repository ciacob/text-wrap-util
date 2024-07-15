import wrapText from "../index.js";
import { expect } from "chai";

describe("wrapText", () => {
  it("should wrap text with default settings", () => {
    const text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.";
    const colsNum = 40;
    const expectedOutput = [
      "Lorem ipsum dolor sit amet, consectetur",
      "adipiscing elit. Integer nec odio.",
      "Praesent libero. Sed cursus ante dapibus",
      "diam.",
    ];
    expect(wrapText(text, colsNum)).to.deep.equal(expectedOutput);
  });

  it("should wrap text with custom gutters", () => {
    const text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.";
    const colsNum = 40;
    const gutters = ["Line 1: ", "Line 2: ", "Line 3: "];
    const expectedOutput = [
      "Line 1: Lorem ipsum dolor sit amet,",
      "Line 2: consectetur adipiscing elit.",
      "Line 3: Integer nec odio. Praesent",
      "Line 3: libero. Sed cursus ante dapibus",
      "Line 3: diam.",
    ];

    expect(wrapText(text, colsNum, gutters)).to.deep.equal(expectedOutput);
  });

  it("should wrap text with custom breakers", () => {
    const text =
      "Lorem ipsum dolor sit amet,. consectetur adipiscing elit, Integer, nec odio, Praesent libero. Sed cursus ante dapibus diam.";
    const colsNum = 40;
    const breakers = [{ value: /[,\.]/, shouldConsume: false }];
    const expectedOutput = [
      "Lorem ipsum dolor sit amet,.",
      "consectetur adipiscing elit, Integer,",
      "nec odio, Praesent libero.",
      "Sed cursus ante dapibus diam.",
    ];

    expect(wrapText(text, colsNum, null, breakers)).to.deep.equal(
      expectedOutput
    );
  });

  it("should wrap text with custom breakers and should consume", () => {
    const text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.";
    const colsNum = 40;
    const breakers = [{ value: /[,\.]/, shouldConsume: true }];
    const expectedOutput = [
      "Lorem ipsum dolor sit amet",
      "consectetur adipiscing elit",
      "Integer nec odio  Praesent libero",
      "Sed cursus ante dapibus diam",
    ];

    expect(wrapText(text, colsNum, null, breakers)).to.deep.equal(
      expectedOutput
    );
  });

  it("should wrap text with intrinsic newline sequences", () => {
    const text =
      "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nInteger nec odio. Praesent libero.\nSed cursus ante dapibus diam.";
    const colsNum = 40;
    const expectedOutput = [
      "Lorem ipsum dolor sit amet,",
      "consectetur adipiscing elit.",
      "Integer nec odio. Praesent libero.",
      "Sed cursus ante dapibus diam.",
    ];

    expect(wrapText(text, colsNum)).to.deep.equal(expectedOutput);
  });

  it("should wrap text with newline sequences and custom gutters", () => {
    const text =
      "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nInteger nec odio. Praesent libero.\nSed cursus ante dapibus diam.";
    const colsNum = 40;
    const gutters = ["1: ", "2: ", "3: "];
    const expectedOutput = [
      "1: Lorem ipsum dolor sit amet,",
      "2: consectetur adipiscing elit.",
      "3: Integer nec odio. Praesent libero.",
      "3: Sed cursus ante dapibus diam.",
    ];

    expect(wrapText(text, colsNum, gutters)).to.deep.equal(expectedOutput);
  });
});
