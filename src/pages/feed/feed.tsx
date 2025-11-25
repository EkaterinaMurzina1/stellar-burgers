import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeeds, selectFeedsOrders } from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedsOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
