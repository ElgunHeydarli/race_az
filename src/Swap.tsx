import { ChangeEvent, useEffect, useState } from 'react';

const currencies = ['EUR', 'USD', 'AZN'];

const rates = [
  { from: 'EUR', to: 'USD', rate: 1.04 },
  { from: 'EUR', to: 'AZN', rate: 1.78 },
  { from: 'USD', to: 'EUR', rate: 0.96 },
  { from: 'USD', to: 'AZN', rate: 1.7 },
  { from: 'AZN', to: 'EUR', rate: 0.56 },
  { from: 'AZN', to: 'USD', rate: 0.59 },
];

export default function Swap() {
  const [currencyFrom, setCurrencyFrom] = useState<string>('EUR');
  const [currencyTo, setCurrencyTo] = useState<string>('USD');

  const [valueFrom, setValueFrom] = useState<number | null>(null);
  const [valueTo, setValueTo] = useState<number | null>(null);


  const [rate, setRate] = useState<number>(1);
  const [lastChanged, setLastChanged] = useState<'from' | 'to'>('from');

  const getRate = (from: string, to: string) => {
    return rates.find((item) => item.from === from && item.to === to)?.rate || 1;
  };

  useEffect(() => {
    const rateValue = getRate(currencyFrom, currencyTo);
    setRate(rateValue);

    if (lastChanged === 'from' && valueFrom !== null) {
      setValueTo(Number((valueFrom * rateValue).toFixed(2)));
    } else if (lastChanged === 'to' && valueTo !== null) {
      setValueFrom(Number((valueTo / rateValue).toFixed(2)));
    }
  }, [currencyFrom, currencyTo]);

  const handleFromValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = Number(value);
    setLastChanged('from');
    if (!isNaN(num)) {
      setValueFrom(num);
      setValueTo(Number((num * rate).toFixed(2)));
    }
  };

  const handleToValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = Number(value);
    setLastChanged('to');
    if (!isNaN(num)) {
      setValueTo(num);
      setValueFrom(Number((num / rate).toFixed(2)));
    }
  };

  const handleChangeCurrentFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === currencyTo) {
      alert('Same currencies not allowed');
      return;
    }
    setCurrencyFrom(value);
  };

  const handleChangeCurrentTo = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === currencyFrom) {
      alert('Same currencies not allowed');
      return;
    }
    setCurrencyTo(value);
  };

  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    setLastChanged('from');
    if (valueTo !== null) {
      const newRate = getRate(currencyTo, currencyFrom); 
      setRate(newRate);
      setValueFrom(valueTo);
      setValueTo(Number((valueTo * newRate).toFixed(2)));
    }
  };

  return (
    <div className="App">
      <h1>Exchange rates calculator</h1>
      <div className="hstack" style={{ gap: '20px', alignItems: 'center' }}>
        <div className="hstack">
          <label>
            From <br />
            <input
              onChange={handleFromValue}
              type="text"
              value={valueFrom ?? ''}
              name="from"
            />
          </label>
          <select value={currencyFrom} onChange={handleChangeCurrentFrom}>
            {currencies.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSwap}>SWAP</button>

        <div className="hstack">
          <label>
            To <br />
            <input
              onChange={handleToValue}
              type="text"
              value={valueTo ?? ''}
              name="to"
            />
          </label>
          <select value={currencyTo} onChange={handleChangeCurrentTo}>
            {currencies.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p>Rate is: {rate}</p>

      <ol style={{ textAlign: 'left', fontSize: 13 }}>
        <li>User should be able to enter amounts in both input fields</li>
        <li>User shouldn't be allowed to select the same from and to currencies</li>
        <li>On swap, amount in "to" should be set as "from" and recalculated</li>
        <li>Current From-To rate should be displayed</li>
        <li>Amount fields validation (skipped)</li>
      </ol>
    </div>
  );
}
