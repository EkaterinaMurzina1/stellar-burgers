import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { setAllIngredients } from '../../services/slices/ingredientsSlice';
import {
  selectPreviewOrder,
  getOrderByNumber
} from '../../services/slices/feedSlice';
import { selectUserOrders } from '../../services/slices/userSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector(selectPreviewOrder);
  const userOrders = useSelector(selectUserOrders);
  const ingredients: TIngredient[] = useSelector(setAllIngredients);
  const dispatch = useDispatch();

  const order = useMemo(() => {
    if (userOrders && userOrders.length > 0) {
      const foundOrder = userOrders.find(
        (order) => order.number === parseInt(number!)
      );
      if (foundOrder) {
        return foundOrder;
      }
    }
    return orderData;
  }, [userOrders, orderData, number]);

  useEffect(() => {
    if (number && !order) {
      dispatch(getOrderByNumber(parseInt(number)));
    }
  }, [number, order, dispatch]);

  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) {
      return null;
    }

    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
