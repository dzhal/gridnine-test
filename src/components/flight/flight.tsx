import styles from './flight.module.css';
import clock from '../../assets/images/clock.png';
import { ILeg } from '../../typings/@types';
import { FC } from 'react';

interface IFlight {
  leg: ILeg;
  last?: boolean;
}

export const Flight: FC<IFlight> = ({ leg, last }) => {
  const hasExchange = (leg: ILeg) => {
    if (leg.segments.length === 2) {
      return true;
    }
    return false;
  };
  const getStartPoint = (leg: ILeg) => {
    if (leg.segments.length < 1) {
      return;
    }
    if (leg.segments.length === 2) {
      const start = leg.segments.filter((segment) => segment.starting === true);
      return {
        city: start[0].departureCity,
        airport: start[0].departureAirport,
        departureDate: start[0].departureDate,
      };
    }
    return {
      city: leg.segments[0].departureCity,
      airport: leg.segments[0].departureAirport,
      departureDate: leg.segments[0].departureDate,
    };
  };
  const getEndPoint = (leg: ILeg) => {
    if (leg.segments.length < 1) {
      return;
    }
    if (leg.segments.length === 2) {
      const start = leg.segments.filter(
        (segment) => segment.starting === false
      );
      return {
        city: start[0].arrivalCity,
        airport: start[0].arrivalAirport,
        arrivalDate: start[0].arrivalDate,
      };
    }
    return {
      city: leg.segments[0].arrivalCity,
      airport: leg.segments[0].arrivalAirport,
      arrivalDate: leg.segments[0].arrivalDate,
    };
  };

  const startPoint = getStartPoint(leg);
  const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  let departureTime;
  let departureDay;
  let departureDayNumber;
  let departureMonth;
  if (startPoint) {
    const departure = new Date(startPoint.departureDate);
    departureTime = departure.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
    departureDay = weekdays[departure.getDay()];
    departureDayNumber = departure.getUTCDate();
    departureMonth = months[departure.getUTCMonth()];
  }
  const endPoint = getEndPoint(leg);
  let arrivalTime;
  let arrivalDay;
  let arrivalDayNumber;
  let arrivalMonth;
  if (endPoint) {
    const departure = new Date(endPoint.arrivalDate);
    arrivalTime = departure.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
    arrivalDay = weekdays[departure.getDay()];
    arrivalDayNumber = departure.getUTCDate();
    arrivalMonth = months[departure.getUTCMonth()];
  }

  return (
    <div className={!last ? styles.container : styles.last_container}>
      <div className={styles.direction}>
        <div className={styles.from}>
          {startPoint?.city?.caption || ''},{' '}
          {startPoint?.airport.caption.split(',')[1]
            ? startPoint?.airport.caption.split(',')[1]
            : startPoint?.airport.caption}{' '}
          <span className={styles.short_destination}>
            ({startPoint?.airport.uid})
          </span>
        </div>
        &rarr;
        <div className={styles.to}>
          {endPoint?.city?.caption || ''},{' '}
          {endPoint?.airport.caption.split(',')[1]
            ? endPoint?.airport.caption.split(',')[1]
            : endPoint?.airport.caption}{' '}
          <span className={styles.short_destination}>
            ({endPoint?.airport.uid})
          </span>
        </div>
      </div>
      <div className={styles.timing}>
        <div className={styles.departure_time}>
          {departureTime} {departureDayNumber} {departureMonth}, {departureDay}
        </div>
        <div className={styles.flight_time}>
          <img src={clock} alt="flight_time_icon" />
          {Math.round(leg.duration / 60)} ч {leg.duration % 60} мин
        </div>
        <div className={styles.arrival_time}>
          {arrivalDayNumber} {arrivalMonth}, {arrivalDay} {arrivalTime}
        </div>
      </div>
      <div className={styles.transfer}>
        {hasExchange(leg) && <span>1 пересадка</span>}
      </div>
      <div className={styles.carrier}>
        Рейс выполняет: {leg.segments[0].airline.caption}
      </div>
    </div>
  );
};
