import { get } from 'lodash';
import { useRouter } from 'next/router';

import { useMakeDealMutation } from '../redux/service/appService';
import { store } from '../redux/store';
import { INFTVariant } from '../types';

export const useSell = (
  variant: INFTVariant,
  onCompleted?: (d?: any) => void,
) => {
  const router = useRouter();
  const { user } = store.getState().auth;

  const [makeDeal, { isLoading }] = useMakeDealMutation();

  const handleSubmit = async () => {
    if (!user?.id || !variant.highestBid.id) return router.push('/login');

    const formattedBid = {
      listing_id: variant.id,
      bid_id: variant.highestBid.id,
      ask_id: null,
    };

    try {
      const data = await makeDeal(formattedBid);

      if (!get(data, 'data.success')) return alert(get(data, 'data.message.message'));

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
