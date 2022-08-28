import styles from './ticket.module.css';
import clock from '../../assets/images/clock.png';

export const Ticket = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.direction}>
          <div className="from">
            Москва, ШЕРЕМЕТЬЕВО{' '}
            <span className={styles.short_destination}>(SVO)</span>
          </div>
          &rarr;
          <div className="to">
            ЛОНДОН, Хитроу{' '}
            <span className={styles.short_destination}>(LHR)</span>
          </div>
        </div>
        <div className={styles.timing}>
          <div className={styles.departure_time}>20:40 18 авг, вт</div>
          <div className={styles.flight_time}>
            <img src={clock} alt="flight_time_icon" />
            14 ч 45 мин
          </div>
          <div className={styles.arrival_time}>19 авг, ср 09:25</div>
        </div>
        <div className={styles.transfer}>
          <span>1 пересадка</span>
        </div>
        <div className={styles.carrier}>
          Рейс выполняет: LOT Polish Airlines
        </div>
        <div className={styles.select}>ВЫБРАТЬ</div>
      </div>
    </>
  );
};
