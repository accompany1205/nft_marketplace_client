import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useMakeDealMutation } from '../redux/service/appService';
import { showToast } from '../redux/slices/layoutSlice';
import { store } from '../redux/store';
import { DealType } from '../types';

type UseCreateDeal = (
  listingId: number,
  onCompleted?: ((d?: any) => void),
) => {
  handleSubmit: (type: DealType) => Promise<boolean | void>;
  isLoading: boolean;
};

const useCreateDeal: UseCreateDeal = (listingId, onCompleted) => {
  const router = useRouter();
  const [makeDeal, { isLoading }] = useMakeDealMutation();
  const dispatch = useDispatch();
  const user = store.getState().auth?.user;

  const handleSubmit = async (type: DealType) => {
    if (!user) {
      dispatch(
        showToast({
          message: 'Please login to continue.',
          type: 'danger',
        }),
      );

      return router.push('/login');
    }

    try {
      const data = await makeDeal({
        listing_id: listingId,
        type,
        user_id: user.id,
      });

      if (!get(data, 'data.success')) {
        dispatch(
          showToast({
            message: get(data, 'error.data.message')
              || 'There is an error. Please tye again.',
            type: 'danger',
          }),
        );

        return;
      }

      dispatch(
        showToast({
          message: 'Deal created successfully.',
          type: 'success',
        }),
      );

      if (onCompleted) return onCompleted();
    } catch (err) {
      showToast({
        message: 'There is an error. Please tye again.',
        type: 'danger',
      });
    }
  };

  return {
    handleSubmit,
    isLoading,
  };
};

export default useCreateDeal;
