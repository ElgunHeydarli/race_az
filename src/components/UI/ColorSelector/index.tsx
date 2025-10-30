// import { Color } from '@/services/products/types';

// interface ColorSelectorProps {
//   colors: string[] | Color[];
//   selectedColor?: string;
//   onColorSelect?: (color: string | Color) => void;
//   className?: string;
// }

// export default function ColorSelector({
//   colors,
//   selectedColor,
//   onColorSelect,
//   className = '',
// }: ColorSelectorProps) {
//   return (
//     <div
//       className={`inline-flex items-center p-2 ml-[12px] mt-[10px] rounded-full bg-[#00000029] backdrop-blur-lg ${className}`}>
//       {colors.map((color, index) => (
//         <button
//           key={index}
//           onClick={() => onColorSelect?.(color)}
//           className={`w-4 h-4 rounded-full border border-white/10 cursor-pointer transition-transform hover:scale-110 ${
//             selectedColor === color
//               ? 'ring-1 ring-white/30 ring-offset-1 ring-offset-black/20'
//               : ''
//           }`}
//           style={{
//             backgroundColor: typeof color === 'string' ? color : color.hex_code,
//             marginLeft: index === 0 ? 0 : '-4px',
//           }}
//           aria-label={`Select color ${index + 1}`}
//         />
//       ))}
//     </div>
//   );
// }

import type { Color } from '@/services/products/types';
import { motion } from 'framer-motion';

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: Color | null;
  onColorSelect: (color: Color) => void;
  className?: string;
}

const ColorSelector = ({
  colors,
  selectedColor,
  onColorSelect,
  className = '',
}: ColorSelectorProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {colors.map((color, index) => {
        const colorValue = typeof color === 'string' ? color : color.hex_code;
        const isSelected = selectedColor?.hex_code === colorValue;

        return (
          <motion.button
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              type: 'spring',
              stiffness: 300,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onColorSelect(color);
            }}
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isSelected ? 'ring-2 ring-[#0B98A1] ring-offset-1' : ''
            }`}
            style={{ backgroundColor: colorValue }}></motion.button>
        );
      })}
    </div>
  );
};

export default ColorSelector;
