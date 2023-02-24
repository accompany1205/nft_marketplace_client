import { useEffect } from 'react';

function useLoadCustomJs({ src }:{src:string}) {
  useEffect(() => {
    if ((window as any)?.onLoadFun !== undefined) {
      (window as any).onLoadFun();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    const interval = setInterval(() => {
      if ((window as any).jQuery !== undefined) {
        (window as any).loaded = true;
        clearInterval(interval);
        document.body.appendChild(script);
      }
    }, 100);
    return () => {
      clearInterval(interval);
      if ((window as any).loaded) {
        document.body.removeChild(script);
      }
    };
  }, []);
}

export default useLoadCustomJs;
