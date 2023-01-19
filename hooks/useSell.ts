import { get } from 'lodash';
import { useRouter } from 'next/router';

import { useMakeDealMutation } from '../redux/service/appService';
import { store } from '../redux/store';
import { INFTVariant } from '../types';

type UseSell = (
  variant: INFTVariant,
  onCompleted?: ((d?: any) => void) | undefined,
) => {
  handleSubmit: () => Promise<boolean | void>;
  isLoading: boolean;
};

const useSell: UseSell = (variant, onCompleted) => {
  const router = useRouter();
  const { user } = store.getState().auth;

  const [makeDeal, { isLoading }] = useMakeDealMutation();

  const handleSubmit = async () => {
    if (!user?.id || !variant.highestBid) return router.push('/login');

    const formattedBid = {
      listing_id: variant.id,
      bid_id: variant.highestBid.id,
      ask_id: null,
    };

    try {
      const data = await makeDeal(formattedBid);

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

export default useSell;
