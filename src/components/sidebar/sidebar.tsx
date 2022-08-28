import React, { FC, useState } from 'react';
import styles from './sidebar.module.css';

interface ISidebar {
  setValueSort: (value: string) => void;
  setValueFilterWoEx: (value: boolean) => void;
  setValueFilterEx: (value: boolean) => void;
  valueFilterEx: boolean;
  valueFilterWoEx: boolean;
}

export const Sidebar: FC<ISidebar> = ({
  setValueSort,
  setValueFilterEx,
  setValueFilterWoEx,
  valueFilterEx,
  valueFilterWoEx,
}) => {
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(100000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSort(e.target.value);
  };
  const handleFilterEx = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueFilterEx(e.target.checked);
  };
  const handleFilterWoEx = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueFilterWoEx(e.target.checked);
  };
  const handlePriceFrom = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setPriceFrom(+e.currentTarget.value);
  };
  const handlePriceTo = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setPriceTo(+e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sort}>
        <h3>Сортировать</h3>
        <fieldset className={styles.fieldset}>
          <p>
            <input
              className={styles.input_radio}
              type="radio"
              value="price_top"
              name="sort"
              id="price_top"
              onChange={handleChange}
              defaultChecked
            />
            <label htmlFor="price_top"> - по возрастанию цены</label>
          </p>
          <p>
            <input
              className={styles.input_radio}
              type="radio"
              value="price_down"
              name="sort"
              id="price_down"
              onChange={handleChange}
            />
            <label htmlFor="price_down"> - по убыванию цены</label>
          </p>

          <p>
            <input
              className={styles.input_radio}
              type="radio"
              value="flight_time"
              name="sort"
              id="flight_time"
              onChange={handleChange}
            />
            <label htmlFor="flight_time"> - по времени в пути</label>
          </p>
        </fieldset>
      </div>
      <div className={styles.filter_transfer}>
        <h3>Фильтровать</h3>
        <fieldset className={styles.fieldset}>
          <p>
            <input
              className={styles.input_checkbox}
              type="checkbox"
              checked={valueFilterEx}
              name="1_exchange"
              id="1_exchange"
              onChange={handleFilterEx}
            />
            <label htmlFor="1_exchange"> - 1 пересадка</label>
          </p>
          <p>
            <input
              className={styles.input_checkbox}
              type="checkbox"
              checked={valueFilterWoEx}
              name="wo_exchange"
              id="wo_exchange"
              onChange={handleFilterWoEx}
            />
            <label htmlFor="wo_exchange"> - без пересадок</label>
          </p>
        </fieldset>
      </div>
      <div className={styles.filter_price}>
        <h3>Цена</h3>
        <p>
          <label htmlFor="price_from">От</label>
          <input
            className={styles.input_price}
            type="number"
            value={Number(priceFrom).toString()}
            name="price_from"
            id="price_from"
            placeholder="0"
            onChange={handlePriceFrom}
          />
        </p>
        <p>
          <label htmlFor="price_from">До</label>
          <input
            className={styles.input_price}
            type="number"
            value={Number(priceTo).toString()}
            name="price_to"
            id="price_to"
            placeholder="0"
            onChange={handlePriceTo}
          />
        </p>
      </div>
      <div className={styles.filter_carrier}></div>
    </div>
  );
};
