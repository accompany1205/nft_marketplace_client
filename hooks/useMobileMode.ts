import { useLayoutEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';

function useMobileMode() {
  const [mobileMode, setMobileMode] = useState(false);
  const width = useWindowWidth();

  useLayoutEffect(() => {
    setMobileMode(width <= 700);
  }, [width]);

  return mobileMode;
}

export default useMobileMode;
