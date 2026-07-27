type ContainInput = {
  sourceWidth: number;
  sourceHeight: number;
  maxWidth: number;
  maxHeight: number;
};

export function containWithin({
  sourceWidth,
  sourceHeight,
  maxWidth,
  maxHeight,
}: ContainInput) {
  const scale = Math.min(
    maxWidth / sourceWidth,
    maxHeight / sourceHeight,
  );
  return {
    width: Math.floor(sourceWidth * scale),
    height: Math.floor(sourceHeight * scale),
  };
}
