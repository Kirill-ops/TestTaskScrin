import { useEffect } from 'react';

function useOutsideClickHandler(ref: any, onHandle?: () => void) {
  useEffect(() => {
    const handleMouseDownOutside = (event: MouseEvent | TouchEvent) => {
      const handleMouseUp = (event: MouseEvent | TouchEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onHandle?.();
        }
      };

      if (ref.current && !ref.current.contains(event.target as Node)) {
        document.addEventListener('mouseup', handleMouseUp, { once: true });
        document.addEventListener('touchend', handleMouseUp, { once: true });
      }
    };

    document.addEventListener('mousedown', handleMouseDownOutside);
    document.addEventListener('touchstart', handleMouseDownOutside);

    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside);
      document.removeEventListener('touchend', handleMouseDownOutside);
    };
  }, [ref, onHandle]);
}

export default useOutsideClickHandler;
