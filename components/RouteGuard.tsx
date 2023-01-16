import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const RouteGuard = ({ children }: any) => {
  const router = useRouter();
  const token = useSelector<RootState>((state) => state.auth.token);
  const authCheck = (url: any) => {
    const publicPaths = ['/', '/login', '/register'];
    const [path] = url.split('?');
    if (!token && !publicPaths.includes(path)) {
      router.push('/login');
    }
  };

  useEffect(() => {
    authCheck(router.asPath);
  }, [children, token]);

  return children;
};

export default RouteGuard;
