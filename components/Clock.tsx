import React, { useEffect, useState } from 'react';

const Clock = ({ deadline }: { deadline: string }) => {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const leading0 = (num: number) => (num < 10 ? `0${num}` : num);
  const getTimeUntil = (deadline: string) => {
    const time = Date.parse(deadline) - Date.parse(new Date().toString());
    if (time < 0) {
      setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      setState({
        days,
        hours,
        minutes,
        seconds,
      });
    }
  };

  useEffect(() => {
    getTimeUntil(deadline);
    setInterval(() => getTimeUntil(deadline), 1000);
  }, []);

  return (
    <div>
      <div className="Clock-days">
        {leading0(state.days)}
        d
      </div>
      <div className="Clock-hours">
        {leading0(state.hours)}
        h
      </div>
      <div className="Clock-minutes">
        {leading0(state.minutes)}
        m
      </div>
      <div className="Clock-seconds">
        {leading0(state.seconds)}
        s
      </div>
    </div>
  );
};

export default Clock;
