import React, { Component } from 'react';

interface Props {
  deadline: string,
}
interface DateType {
  days: number,
  hours: number,
  minutes: number,
  seconds: number
}
class Clock extends React.Component<Props, DateType> {
  constructor(props: Props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    this.getTimeUntil(this.props.deadline);
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }

  leading0(num: number) {
    return num < 10 ? `0${num}` : num;
  }

  getTimeUntil(deadline: string) {
    const time = Date.parse(deadline) - Date.parse(JSON.stringify(new Date()));
    if (time < 0) {
      this.setState({
        days: 0, hours: 0, minutes: 0, seconds: 0,
      });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({
        days, hours, minutes, seconds,
      });
    }
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {

    };
  }

  render() {
    return (
      <div>
        <div className="Clock-days">
          {this.leading0(this.state.days)}
          d
        </div>
        <div className="Clock-hours">
          {this.leading0(this.state.hours)}
          h
        </div>
        <div className="Clock-minutes">
          {this.leading0(this.state.minutes)}
          m
        </div>
        <div className="Clock-seconds">
          {this.leading0(this.state.seconds)}
          s
        </div>
      </div>
    );
  }
}
export default Clock;
