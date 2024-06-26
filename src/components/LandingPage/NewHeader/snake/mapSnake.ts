export const gameSegments = {
  bodyHorizontal: [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
  ],
  bodyHorizontalWithFood: [
    [0, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 0],
  ],
  bodyVertical: [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [0, 0, 0, 0],
  ],
  bodyVerticalWithFood: [
    [0, 1, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 0],
  ],
  tailLeft: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  tailRight: [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ],
  tailUp: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  tailDown: [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  headLeft: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
  ],
  headLeftFood: [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
  ],
  headRight: [
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ],
  headRightFood: [
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
  ],
  headUp: [
    [0, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  headUpFood: [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 1, 1, 1],
    [1, 0, 0, 0],
  ],
  headDown: [
    [0, 1, 0, 0],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  headDownFood: [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 1],
  ],
  turnBottomRight: [
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  turnBottomRightWithFood: [
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  turnTopRight: [
    [0, 1, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
    [0, 0, 0, 0],
  ],
  turnTopRightWithFood: [
    [0, 1, 1, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
    [0, 0, 0, 0],
  ],
  turnBottomLeft: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
  ],
  turnBottomLeftWithFood: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 1, 1, 0],
  ],
  turnTopLeft: [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 0],
  ],
  turnTopLeftWithFood: [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 1],
  ],
  food: [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ],
};

export const mapSnake = ({
  snake,
  gridWidth,
  gridHeight,
  food,
  eatenFood,
}: {
  snake: { x: number; y: number }[];
  gridWidth: number;
  gridHeight: number;
  food: { x: number; y: number };
  eatenFood: { x: number; y: number }[];
}): { x: number; y: number; type: keyof typeof gameSegments }[] => {
  return snake.map((segment, index, array) => {
    const previousSegment = array[index + 1];
    const nextSegment = array[index - 1];
    const withFood = eatenFood.some(
      ({ x, y }) => x === segment.x && y === segment.y,
    );

    if (index === 0) {
      if (segment.x === previousSegment.x) {
        if (
          segment.y - previousSegment.y === -1 ||
          (segment.y === gridHeight - 1 && previousSegment.y === 0)
        ) {
          if (food.x === segment.x && food.y - segment.y === -1) {
            return { ...segment, type: "headUpFood" };
          }
          return { ...segment, type: "headUp" };
        }
        if (
          segment.y - previousSegment.y === 1 ||
          (segment.y === 0 && previousSegment.y === gridHeight - 1)
        ) {
          if (food.x === segment.x && food.y - segment.y === 1) {
            return { ...segment, type: "headDownFood" };
          }
          return { ...segment, type: "headDown" };
        }
      }
      if (segment.y === previousSegment.y) {
        if (
          segment.x - previousSegment.x === -1 ||
          (segment.x === gridWidth - 1 && previousSegment.x === 0)
        ) {
          if (food.y === segment.y && food.x - segment.x === -1) {
            return { ...segment, type: "headLeftFood" };
          }
          return { ...segment, type: "headLeft" };
        }
        if (
          segment.x - previousSegment.x === 1 ||
          (segment.x === 0 && previousSegment.x === gridWidth - 1)
        ) {
          if (food.y === segment.y && food.x - segment.x === 1) {
            return { ...segment, type: "headRightFood" };
          }
          return { ...segment, type: "headRight" };
        }
      }
    }

    if (index === array.length - 1) {
      if (segment.x === nextSegment.x) {
        if (
          segment.y - nextSegment.y === -1 ||
          (segment.y === gridHeight - 1 && nextSegment.y === 0)
        ) {
          return { ...segment, type: "tailDown" };
        }
        if (
          segment.y - nextSegment.y === 1 ||
          (segment.y === 0 && nextSegment.y === gridHeight - 1)
        ) {
          return { ...segment, type: "tailUp" };
        }
      }
      if (segment.y === nextSegment.y) {
        if (
          segment.x - nextSegment.x === -1 ||
          (segment.x === gridWidth - 1 && nextSegment.x === 0)
        ) {
          return { ...segment, type: "tailRight" };
        }
        if (
          segment.x - nextSegment.x === 1 ||
          (segment.x === 0 && nextSegment.x === gridWidth - 1)
        ) {
          return { ...segment, type: "tailLeft" };
        }
      }
    }

    if (segment.x === previousSegment.x && segment.x === nextSegment.x) {
      return {
        ...segment,
        type: withFood ? "bodyVerticalWithFood" : "bodyVertical",
      };
    }

    if (segment.y === previousSegment.y && segment.y === nextSegment.y) {
      return {
        ...segment,
        type: withFood ? "bodyHorizontalWithFood" : "bodyHorizontal",
      };
    }

    // Moving right
    if (
      segment.x - previousSegment.x === 1 ||
      (previousSegment.x === gridWidth - 1 && segment.x === 0)
    ) {
      if (
        nextSegment.y - segment.y === 1 ||
        (segment.y === gridHeight - 1 && nextSegment.y === 0)
      )
        return {
          ...segment,
          type: withFood ? "turnTopRightWithFood" : "turnTopRight",
        };
      if (
        nextSegment.y - segment.y === -1 ||
        (segment.y === 0 && nextSegment.y === gridHeight - 1)
      )
        return {
          ...segment,
          type: withFood ? "turnBottomRightWithFood" : "turnBottomRight",
        };
    }

    // Moving left
    if (
      segment.x - previousSegment.x === -1 ||
      (previousSegment.x === 0 && segment.x === gridWidth - 1)
    ) {
      if (
        nextSegment.y - segment.y === 1 ||
        (segment.y === gridHeight - 1 && nextSegment.y === 0)
      )
        return {
          ...segment,
          type: withFood ? "turnTopLeftWithFood" : "turnTopLeft",
        };
      if (
        nextSegment.y - segment.y === -1 ||
        (segment.y === 0 && nextSegment.y === gridHeight - 1)
      )
        return {
          ...segment,
          type: withFood ? "turnBottomLeftWithFood" : "turnBottomLeft",
        };
    }

    // Moving down
    if (
      segment.y - previousSegment.y === 1 ||
      (previousSegment.y === gridHeight - 1 && segment.y === 0)
    ) {
      if (
        nextSegment.x - segment.x === 1 ||
        (segment.x === gridWidth - 1 && nextSegment.x === 0)
      )
        return {
          ...segment,
          type: withFood ? "turnBottomLeftWithFood" : "turnBottomLeft",
        };
      if (
        nextSegment.x - segment.x === -1 ||
        (segment.x === 0 && nextSegment.x === gridWidth - 1)
      )
        return {
          ...segment,
          type: withFood ? "turnBottomRightWithFood" : "turnBottomRight",
        };
    }

    // Moving up
    if (
      segment.y - previousSegment.y === -1 ||
      (previousSegment.y === 0 && segment.y === gridHeight - 1)
    ) {
      if (
        nextSegment.x - segment.x === 1 ||
        (segment.x === gridWidth - 1 && nextSegment.x === 0)
      )
        return {
          ...segment,
          type: withFood ? "turnTopLeftWithFood" : "turnTopLeft",
        };
      if (
        nextSegment.x - segment.x === -1 ||
        (segment.x === 0 && nextSegment.x === gridWidth - 1)
      )
        return {
          ...segment,
          type: withFood ? "turnTopRightWithFood" : "turnTopRight",
        };
    }

    return { ...segment, type: "bodyVertical" };
  });
};
