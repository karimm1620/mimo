import { Path } from 'react-native-svg';

import type { MoodExpression } from '@/constants';

type FacePaths = {
  leftEye: string;
  rightEye: string;
  mouth: string;
};

/** All paths live in a shared 0–100 viewBox so any face drops into any shape. */
const FACES: Record<MoodExpression, FacePaths> = {
  joyful: {
    leftEye: 'M 30 42 Q 36 34 42 42',
    rightEye: 'M 58 42 Q 64 34 70 42',
    mouth: 'M 34 58 Q 50 74 66 58',
  },
  wide: {
    leftEye: 'M 36 44 a 5 6 0 1 0 0.1 0',
    rightEye: 'M 64 44 a 5 6 0 1 0 0.1 0',
    mouth: 'M 42 62 Q 50 68 58 62',
  },
  neutral: {
    leftEye: 'M 36 42 a 3.5 3.5 0 1 0 0.1 0',
    rightEye: 'M 64 42 a 3.5 3.5 0 1 0 0.1 0',
    mouth: 'M 40 60 L 60 60',
  },
  sleepy: {
    leftEye: 'M 30 42 Q 36 47 42 42',
    rightEye: 'M 58 42 Q 64 47 70 42',
    mouth: 'M 44 60 Q 50 63 56 60',
  },
  worried: {
    leftEye: 'M 36 44 a 3.2 3.2 0 1 0 0.1 0',
    rightEye: 'M 64 44 a 3.2 3.2 0 1 0 0.1 0',
    mouth: 'M 38 64 Q 44 58 50 62 Q 56 66 62 60',
  },
  squint: {
    leftEye: 'M 30 40 L 42 45',
    rightEye: 'M 70 40 L 58 45',
    mouth: 'M 40 63 L 60 63',
  },
  sad: {
    leftEye: 'M 36 42 a 3.2 3.2 0 1 0 0.1 0',
    rightEye: 'M 64 42 a 3.2 3.2 0 1 0 0.1 0',
    mouth: 'M 38 66 Q 50 54 62 66',
  },
};

type MoodFaceProps = {
  expression: MoodExpression;
  color: string;
  strokeWidth?: number;
};

export function MoodFace({ expression, color, strokeWidth = 4.5 }: MoodFaceProps) {
  const face = FACES[expression];

  return (
    <>
      <Path
        d={face.leftEye}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d={face.rightEye}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d={face.mouth}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  );
}
