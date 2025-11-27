import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeeds,
  selectFeedsOrders,
  selectFeedsLoading
} from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedsOrders);
  const dispatch = useDispatch();
  const loading = useSelector(selectFeedsLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
