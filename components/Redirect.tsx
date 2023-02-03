import { useEffect } from 'react';

import { useRouter } from 'next/router';

interface Props {
  path: string;
}

const Redirect: React.FC<Props> = ({ path }) => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push(path), 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default Redirect;
