// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { describe, expect, test } from "vitest";
import {
  gameSegments,
  mapSnake,
} from "../components/landing/header/snake/mapSnake";

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
      { x: 0, y: 0, segment: gameSegments.headLeft },
      { x: 1, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 2, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 3, y: 0, segment: gameSegments.tailLeft },
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
      { x: 3, y: 0, segment: gameSegments.headRight },
      { x: 2, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 1, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 0, y: 0, segment: gameSegments.tailRight },
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
      { x: 0, y: 0, segment: gameSegments.headUp },
      { x: 0, y: 1, segment: gameSegments.bodyVertical },
      { x: 0, y: 2, segment: gameSegments.bodyVertical },
      { x: 0, y: 3, segment: gameSegments.tailUp },
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
      { x: 0, y: 3, segment: gameSegments.headDown },
      { x: 0, y: 2, segment: gameSegments.bodyVertical },
      { x: 0, y: 1, segment: gameSegments.bodyVertical },
      { x: 0, y: 0, segment: gameSegments.tailDown },
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
      { x: 0, y: 0, segment: gameSegments.headDown },
      { x: 0, y: 9, segment: gameSegments.bodyVertical },
      { x: 0, y: 8, segment: gameSegments.tailDown },
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
      { x: 0, y: 9, segment: gameSegments.headUp },
      { x: 0, y: 0, segment: gameSegments.bodyVertical },
      { x: 0, y: 1, segment: gameSegments.tailUp },
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
      { x: 18, y: 0, segment: gameSegments.headLeft },
      { x: 0, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 1, y: 0, segment: gameSegments.tailLeft },
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
      { x: 0, y: 0, segment: gameSegments.headRight },
      { x: 18, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 17, y: 0, segment: gameSegments.tailRight },
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
      { x: 0, y: 0, segment: gameSegments.headLeft },
      { x: 1, y: 0, segment: gameSegments.turnTopRight },
      { x: 1, y: 1, segment: gameSegments.bodyVertical },
      { x: 1, y: 2, segment: gameSegments.turnBottomLeft },
      { x: 2, y: 2, segment: gameSegments.bodyHorizontal },
      { x: 3, y: 2, segment: gameSegments.turnBottomRight },
      { x: 3, y: 1, segment: gameSegments.turnTopLeft },
      { x: 4, y: 1, segment: gameSegments.turnTopRight },
      { x: 4, y: 2, segment: gameSegments.bodyVertical },
      { x: 4, y: 3, segment: gameSegments.turnBottomRight },
      { x: 3, y: 3, segment: gameSegments.bodyHorizontal },
      { x: 2, y: 3, segment: gameSegments.turnTopLeft },
      { x: 2, y: 4, segment: gameSegments.tailUp },
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
      { x: 15, y: 2, segment: gameSegments.headDown },
      { x: 15, y: 1, segment: gameSegments.bodyVertical },
      { x: 15, y: 0, segment: gameSegments.turnTopLeft },
      { x: 16, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 17, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 18, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 0, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 1, y: 0, segment: gameSegments.turnBottomRight },
      { x: 1, y: 9, segment: gameSegments.turnTopLeft },
      { x: 2, y: 9, segment: gameSegments.turnTopRight },
      { x: 2, y: 0, segment: gameSegments.bodyVertical },
      { x: 2, y: 1, segment: gameSegments.turnBottomRight },
      { x: 1, y: 1, segment: gameSegments.bodyHorizontal },
      { x: 0, y: 1, segment: gameSegments.turnTopLeft },
      { x: 0, y: 2, segment: gameSegments.turnBottomRight },
      { x: 18, y: 2, segment: gameSegments.turnTopLeft },
      { x: 18, y: 3, segment: gameSegments.turnBottomRight },
      { x: 17, y: 3, segment: gameSegments.turnTopLeft },
      { x: 17, y: 4, segment: gameSegments.turnBottomLeft },
      { x: 18, y: 4, segment: gameSegments.bodyHorizontal },
      { x: 0, y: 4, segment: gameSegments.tailLeft },
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
      { x: 0, y: 1, segment: gameSegments.headUpFood },
      { x: 0, y: 2, segment: gameSegments.bodyVertical },
      { x: 0, y: 3, segment: gameSegments.tailUp },
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
      { x: 0, y: 2, segment: gameSegments.headDownFood },
      { x: 0, y: 1, segment: gameSegments.bodyVertical },
      { x: 0, y: 0, segment: gameSegments.tailDown },
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
      { x: 1, y: 0, segment: gameSegments.headLeftFood },
      { x: 2, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 3, y: 0, segment: gameSegments.tailLeft },
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
      { x: 2, y: 0, segment: gameSegments.headRightFood },
      { x: 1, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 0, y: 0, segment: gameSegments.tailRight },
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
      { x: 15, y: 2, segment: gameSegments.headDownFood },
      { x: 15, y: 1, segment: gameSegments.bodyVertical },
      { x: 15, y: 0, segment: gameSegments.turnTopLeftWithFood },
      { x: 16, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 17, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 18, y: 0, segment: gameSegments.bodyHorizontalWithFood },
      { x: 0, y: 0, segment: gameSegments.bodyHorizontal },
      { x: 1, y: 0, segment: gameSegments.turnBottomRight },
      { x: 1, y: 9, segment: gameSegments.turnTopLeftWithFood },
      { x: 2, y: 9, segment: gameSegments.turnTopRight },
      { x: 2, y: 0, segment: gameSegments.bodyVerticalWithFood },
      { x: 2, y: 1, segment: gameSegments.turnBottomRight },
      { x: 1, y: 1, segment: gameSegments.bodyHorizontal },
      { x: 0, y: 1, segment: gameSegments.turnTopLeft },
      { x: 0, y: 2, segment: gameSegments.turnBottomRightWithFood },
      { x: 18, y: 2, segment: gameSegments.turnTopLeft },
      { x: 18, y: 3, segment: gameSegments.turnBottomRight },
      { x: 17, y: 3, segment: gameSegments.turnTopLeft },
      { x: 17, y: 4, segment: gameSegments.turnBottomLeft },
      { x: 18, y: 4, segment: gameSegments.bodyHorizontalWithFood },
      { x: 0, y: 4, segment: gameSegments.tailLeft },
    ]);
  });
});
