import React from 'react';

interface IProps{
    title: string
    descriprion:string
    fees: number
    background:string
}
const PlanCard:React.FC<IProps> = (props) => {
  const {
    title, fees, background, descriprion,
  } = props;
  return (
    <div className="pricing-table__head" style={{ background }}>
      <h4 className="pricing-table__head-text">{title}</h4>
      <p className="pricing-table__head--sub-text">{descriprion}</p>
      <h2 className="pricing-table__head--price">
        {fees.toFixed(1)}
        <span> %</span>
      </h2>
    </div>
  );
};

export default PlanCard;
