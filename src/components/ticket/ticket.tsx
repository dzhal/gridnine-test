import styles from './ticket.module.css';
import { nanoid } from 'nanoid';
import { ILeg } from '../../typings/@types';
import { FC } from 'react';
import { Flight } from '../flight/flight';

interface ITicket {
  price: string;
  currency: string;
  legs: ILeg[];
}

export const Ticket: FC<ITicket> = ({ price, currency, legs }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.flight_header}>
          <div className={styles.carrier_logo}>LOGO</div>
          <div className={styles.price_block}>
            <div className={styles.price}>
              {price} {currency}
            </div>
            <div className={styles.desc}>
              Стоимость для одного взрослого пассажира
            </div>
          </div>
        </div>
        {legs.map((leg, index) => {
          if (index === legs.length - 1) {
            return <Flight last={true} key={nanoid(6)} leg={leg} />;
          }
          return <Flight key={nanoid(6)} leg={leg} />;
        })}
        <div className={styles.select}>ВЫБРАТЬ</div>
      </div>
    </>
  );
};
