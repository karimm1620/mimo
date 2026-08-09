import Svg, { Circle, Path, Polygon, Rect } from 'react-native-svg';

import type { MoodExpression, MoodShapeKind } from '@/constants';

import { MoodFace } from './mood-face';

const HEXAGON_POINTS = '50,4 10.2,27 10.2,73 50,96 89.8,73 89.8,27';
const DIAMOND_POINTS = '50,2 98,50 50,98 2,50';
const TRIANGLE_POINTS = '50,8 92,88 8,88';
const ARCH_PATH = 'M 4 46 A 46 46 0 0 1 96 46 L 96 78 Q 96 96 78 96 L 22 96 Q 4 96 4 78 Z';
const BLOB_PATH =
  'M 50 5 C 68 5 82 15 88 32 C 95 50 90 68 76 80 C 64 90 50 92 38 86 C 22 78 8 64 8 46 C 8 24 26 5 50 5 Z';

const FACE_COLOR = '#302D2A';

function ShapeFill({ shape, color }: { shape: MoodShapeKind; color: string }) {
  switch (shape) {
    case 'circle':
      return <Circle cx={50} cy={50} r={47} fill={color} />;
    case 'squircle':
      return <Rect x={4} y={4} width={92} height={92} rx={30} ry={30} fill={color} />;
    case 'hexagon':
      return <Polygon points={HEXAGON_POINTS} fill={color} />;
    case 'diamond':
      return <Polygon points={DIAMOND_POINTS} fill={color} />;
    case 'triangle':
      return <Polygon points={TRIANGLE_POINTS} fill={color} strokeLinejoin="round" />;
    case 'arch':
      return <Path d={ARCH_PATH} fill={color} />;
    case 'blob':
      return <Path d={BLOB_PATH} fill={color} />;
    default:
      return null;
  }
}

type MoodShapeProps = {
  shape: MoodShapeKind;
  expression: MoodExpression;
  color: string;
  size?: number;
};

export function MoodShape({ shape, expression, color, size = 64 }: MoodShapeProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <ShapeFill shape={shape} color={color} />
      <MoodFace expression={expression} color={FACE_COLOR} />
    </Svg>
  );
}
