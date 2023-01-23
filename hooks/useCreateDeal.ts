import { get } from 'lodash';
import { useRouter } from 'next/router';

import { useMakeDealMutation } from '../redux/service/appService';
import { store } from '../redux/store';
import { DealType } from '../types';

type UseCreateDeal = (
  listingId: number,
  onCompleted?: ((d?: any) => void) | undefined,
) => {
  handleSubmit: (type: DealType) => Promise<boolean | void>;
  isLoading: boolean;
};

const useCreateDeal: UseCreateDeal = (listingId, onCompleted) => {
  const router = useRouter();
  const [makeDeal, { isLoading }] = useMakeDealMutation();
  const user = store.getState().auth?.user;

  const handleSubmit = async (type: DealType) => {
    if (!user) return router.push('/login');

    try {
      const data = await makeDeal({
        listing_id: listingId,
        type,
        user_id: user.id,
      });

      if (!get(data, 'data.success')) {
        return alert(get(data, 'data.message'));
      }

      if (onCompleted) return onCompleted();
    } catch (err) {
      return alert(err);
    }
  };

  return {
    handleSubmit,
    isLoading,
  };
};

export default useCreateDeal;
