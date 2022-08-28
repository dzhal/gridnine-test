import { Sidebar } from '../sidebar/sidebar';
import { Ticket } from '../ticket/ticket';
import styles from './app.module.css';
import { data } from '../../data/flights';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { IFlight } from '../../typings/@types';

type TFlights = {
  flight: IFlight;
  flightToken: string;
  hasExtendedFare: boolean;
};

function App() {
  const [flights, setFlights] = useState<TFlights[]>(data.flights);
  const [valueSort, setValueSort] = useState('price_top');
  const [valueFilterEx, setValueFilterEx] = useState(true);
  const [valueFilterWoEx, setValueFilterWoEx] = useState(true);
  // const flights = data.flights;
  // console.log(flights);

  switch (valueSort) {
    case 'price_top':
      flights.sort(
        (a, b) =>
          Number(a.flight.price.total.amount) -
          Number(b.flight.price.total.amount)
      );
      break;
    case 'price_down':
      flights.sort(
        (a, b) =>
          Number(b.flight.price.total.amount) -
          Number(a.flight.price.total.amount)
      );
      break;
    case 'flight_time':
      flights.sort(
        (a, b) =>
          Number(a.flight.legs[0].duration + a.flight.legs[1].duration) -
          Number(b.flight.legs[0].duration + b.flight.legs[1].duration)
      );
      break;
  }

  useEffect(() => {
    if (valueFilterEx && valueFilterWoEx) {
      setFlights(data.flights);
    } else if (valueFilterEx && !valueFilterWoEx) {
      setFlights(
        flights.filter(({ flight }) =>
          flight.legs.some((leg) => leg.segments.length > 1)
        )
      );
    } else if (valueFilterWoEx && !valueFilterEx) {
      setFlights(
        flights.filter(({ flight }) =>
          flight.legs.every((leg) => leg.segments.length < 2)
        )
      );
    } else {
      setFlights([]);
    }
  }, [valueFilterEx, valueFilterWoEx]);

  // flights.length = 5;
  return (
    <main className={styles.container}>
      <Sidebar
        setValueSort={setValueSort}
        valueFilterEx={valueFilterEx}
        valueFilterWoEx={valueFilterWoEx}
        setValueFilterEx={setValueFilterEx}
        setValueFilterWoEx={setValueFilterWoEx}
      />
      <div className={styles.tickets}>
        {flights.map(({ flight }) => {
          return (
            <li key={nanoid(6)}>
              <Ticket
                price={flight.price.total.amount}
                currency={flight.price.total.currency}
                legs={flight.legs}
              />
            </li>
          );
        })}
      </div>
    </main>
  );
}

export default App;
