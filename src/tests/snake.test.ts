// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { describe, expect, test } from "vitest";
import { mapSnake } from "../components/LandingPage/NewHeader/snake/mapSnake";

const gridHeight = 10;
const gridWidth = 19;
describe("Test snake body mapper", () => {
  test("Straight body left", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 0, type: "headLeft" },
      { x: 1, y: 0, type: "bodyHorizontal" },
      { x: 2, y: 0, type: "bodyHorizontal" },
      { x: 3, y: 0, type: "tailLeft" },
    ]);
  });
  test("Straight body right", () => {
    expect(
      mapSnake({
        snake: [
          { x: 3, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: 0 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 3, y: 0, type: "headRight" },
      { x: 2, y: 0, type: "bodyHorizontal" },
      { x: 1, y: 0, type: "bodyHorizontal" },
      { x: 0, y: 0, type: "tailRight" },
    ]);
  });
  test("Straight body up", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 0, type: "headUp" },
      { x: 0, y: 1, type: "bodyVertical" },
      { x: 0, y: 2, type: "bodyVertical" },
      { x: 0, y: 3, type: "tailUp" },
    ]);
  });
  test("Straight body down", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 3 },
          { x: 0, y: 2 },
          { x: 0, y: 1 },
          { x: 0, y: 0 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 3, type: "headDown" },
      { x: 0, y: 2, type: "bodyVertical" },
      { x: 0, y: 1, type: "bodyVertical" },
      { x: 0, y: 0, type: "tailDown" },
    ]);
  });
  test("Head bottom transfer", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 0 },
          { x: 0, y: 9 },
          { x: 0, y: 8 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 0, type: "headDown" },
      { x: 0, y: 9, type: "bodyVertical" },
      { x: 0, y: 8, type: "tailDown" },
    ]);
  });
  test("Head top transfer", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 9 },
          { x: 0, y: 0 },
          { x: 0, y: 1 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 9, type: "headUp" },
      { x: 0, y: 0, type: "bodyVertical" },
      { x: 0, y: 1, type: "tailUp" },
    ]);
  });
  test("Head left transfer", () => {
    expect(
      mapSnake({
        snake: [
          { x: 18, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 18, y: 0, type: "headLeft" },
      { x: 0, y: 0, type: "bodyHorizontal" },
      { x: 1, y: 0, type: "tailLeft" },
    ]);
  });
  test("Head right transfer", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 0 },
          { x: 18, y: 0 },
          { x: 17, y: 0 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 0, type: "headRight" },
      { x: 18, y: 0, type: "bodyHorizontal" },
      { x: 17, y: 0, type: "tailRight" },
    ]);
  });
  test("Turns", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 4, y: 2 },
          { x: 4, y: 3 },
          { x: 3, y: 3 },
          { x: 2, y: 3 },
          { x: 2, y: 4 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 0, type: "headLeft" },
      { x: 1, y: 0, type: "turnTopRight" },
      { x: 1, y: 1, type: "bodyVertical" },
      { x: 1, y: 2, type: "turnBottomLeft" },
      { x: 2, y: 2, type: "bodyHorizontal" },
      { x: 3, y: 2, type: "turnBottomRight" },
      { x: 3, y: 1, type: "turnTopLeft" },
      { x: 4, y: 1, type: "turnTopRight" },
      { x: 4, y: 2, type: "bodyVertical" },
      { x: 4, y: 3, type: "turnBottomRight" },
      { x: 3, y: 3, type: "bodyHorizontal" },
      { x: 2, y: 3, type: "turnTopLeft" },
      { x: 2, y: 4, type: "tailUp" },
    ]);
  });
  test("Turns with transfers", () => {
    expect(
      mapSnake({
        snake: [
          { x: 15, y: 2 },
          { x: 15, y: 1 },
          { x: 15, y: 0 },
          { x: 16, y: 0 },
          { x: 17, y: 0 },
          { x: 18, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 9 },
          { x: 2, y: 9 },
          { x: 2, y: 0 },
          { x: 2, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 18, y: 2 },
          { x: 18, y: 3 },
          { x: 17, y: 3 },
          { x: 17, y: 4 },
          { x: 18, y: 4 },
          { x: 0, y: 4 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 99, y: 99 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 15, y: 2, type: "headDown" },
      { x: 15, y: 1, type: "bodyVertical" },
      { x: 15, y: 0, type: "turnTopLeft" },
      { x: 16, y: 0, type: "bodyHorizontal" },
      { x: 17, y: 0, type: "bodyHorizontal" },
      { x: 18, y: 0, type: "bodyHorizontal" },
      { x: 0, y: 0, type: "bodyHorizontal" },
      { x: 1, y: 0, type: "turnBottomRight" },
      { x: 1, y: 9, type: "turnTopLeft" },
      { x: 2, y: 9, type: "turnTopRight" },
      { x: 2, y: 0, type: "bodyVertical" },
      { x: 2, y: 1, type: "turnBottomRight" },
      { x: 1, y: 1, type: "bodyHorizontal" },
      { x: 0, y: 1, type: "turnTopLeft" },
      { x: 0, y: 2, type: "turnBottomRight" },
      { x: 18, y: 2, type: "turnTopLeft" },
      { x: 18, y: 3, type: "turnBottomRight" },
      { x: 17, y: 3, type: "turnTopLeft" },
      { x: 17, y: 4, type: "turnBottomLeft" },
      { x: 18, y: 4, type: "bodyHorizontal" },
      { x: 0, y: 4, type: "tailLeft" },
    ]);
  });
  test("Head up next to food", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 0, y: 0 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 1, type: "headUpFood" },
      { x: 0, y: 2, type: "bodyVertical" },
      { x: 0, y: 3, type: "tailUp" },
    ]);
  });
  test("Head down next to food", () => {
    expect(
      mapSnake({
        snake: [
          { x: 0, y: 2 },
          { x: 0, y: 1 },
          { x: 0, y: 0 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 0, y: 3 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 0, y: 2, type: "headDownFood" },
      { x: 0, y: 1, type: "bodyVertical" },
      { x: 0, y: 0, type: "tailDown" },
    ]);
  });
  test("Head left next to food", () => {
    expect(
      mapSnake({
        snake: [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 0, y: 0 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 1, y: 0, type: "headLeftFood" },
      { x: 2, y: 0, type: "bodyHorizontal" },
      { x: 3, y: 0, type: "tailLeft" },
    ]);
  });
  test("Head right next to food", () => {
    expect(
      mapSnake({
        snake: [
          { x: 2, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: 0 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 3, y: 0 },
        eatenFood: [],
      }),
    ).toStrictEqual([
      { x: 2, y: 0, type: "headRightFood" },
      { x: 1, y: 0, type: "bodyHorizontal" },
      { x: 0, y: 0, type: "tailRight" },
    ]);
  });
  test("Turns with transfers and food", () => {
    expect(
      mapSnake({
        snake: [
          { x: 15, y: 2 },
          { x: 15, y: 1 },
          { x: 15, y: 0 },
          { x: 16, y: 0 },
          { x: 17, y: 0 },
          { x: 18, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 9 },
          { x: 2, y: 9 },
          { x: 2, y: 0 },
          { x: 2, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 18, y: 2 },
          { x: 18, y: 3 },
          { x: 17, y: 3 },
          { x: 17, y: 4 },
          { x: 18, y: 4 },
          { x: 0, y: 4 },
        ],
        gridHeight,
        gridWidth,
        food: { x: 15, y: 3 },
        eatenFood: [
          { x: 15, y: 0 },
          { x: 18, y: 0 },
          { x: 1, y: 9 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
          { x: 18, y: 4 },
          { x: 0, y: 4 },
        ],
      }),
    ).toStrictEqual([
      { x: 15, y: 2, type: "headDownFood" },
      { x: 15, y: 1, type: "bodyVertical" },
      { x: 15, y: 0, type: "turnTopLeftWithFood" },
      { x: 16, y: 0, type: "bodyHorizontal" },
      { x: 17, y: 0, type: "bodyHorizontal" },
      { x: 18, y: 0, type: "bodyHorizontalWithFood" },
      { x: 0, y: 0, type: "bodyHorizontal" },
      { x: 1, y: 0, type: "turnBottomRight" },
      { x: 1, y: 9, type: "turnTopLeftWithFood" },
      { x: 2, y: 9, type: "turnTopRight" },
      { x: 2, y: 0, type: "bodyVerticalWithFood" },
      { x: 2, y: 1, type: "turnBottomRight" },
      { x: 1, y: 1, type: "bodyHorizontal" },
      { x: 0, y: 1, type: "turnTopLeft" },
      { x: 0, y: 2, type: "turnBottomRightWithFood" },
      { x: 18, y: 2, type: "turnTopLeft" },
      { x: 18, y: 3, type: "turnBottomRight" },
      { x: 17, y: 3, type: "turnTopLeft" },
      { x: 17, y: 4, type: "turnBottomLeft" },
      { x: 18, y: 4, type: "bodyHorizontalWithFood" },
      { x: 0, y: 4, type: "tailLeft" },
    ]);
  });
});
