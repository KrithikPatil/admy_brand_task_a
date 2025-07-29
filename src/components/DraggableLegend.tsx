'use client';

import { useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/web';

type LegendData = {
  name: string;
  value: number;
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FFBB28', '#FF4444'];

interface DraggableLegendProps {
  data: LegendData[];
}

const DraggableLegend: React.FC<DraggableLegendProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(
    ({ offset: [dx], last }) => {
      api.start({ x: dx });
    },
    { axis: 'x' }
  );

  return (
    <div className="relative overflow-hidden mt-4 h-[60px]">
      <animated.div
        {...bind()}
        ref={containerRef}
        className="flex gap-4 px-4 active:cursor-grabbing cursor-grab select-none"
        style={{ x, touchAction: 'pan-y' }}
      >
        {data.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 whitespace-nowrap border px-3 py-2 rounded-md text-sm font-medium"
            style={{ borderColor: COLORS[index % COLORS.length], borderWidth: 1 }}
          >
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            {entry.name} ({entry.value})
          </div>
        ))}
      </animated.div>
      <div className="text-[10px] text-muted-foreground mt-1 text-center">
        Drag to see the entire legend
      </div>
    </div>
  );
};

export default DraggableLegend;
