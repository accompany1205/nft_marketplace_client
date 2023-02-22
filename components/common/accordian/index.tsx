import React from 'react';

import { v4 as uuid } from 'uuid';

interface IProps{
  title:string,
  children: JSX.Element | JSX.Element[]
  accordianParentId:string
}
const Accordian:React.FC<IProps> = (props) => {
  const { title, children, accordianParentId } = props;
  const uniqueId = uuid();
  const accordianId = `general-heading-${uniqueId}`;
  // const accordianParentId = `general-accordion${String(uniqueId)}`;
  const accordianChildId = `general-collapse-${String(uniqueId)}`;
  return (
  // <div className="accordion accordion-flush" id={`${accordianParentId}`} style={{ backgroundSize: 'cover' }}>
    <div className="accordion-item" style={{ backgroundSize: 'cover' }}>
      <h2 className="accordion-header" id={accordianId}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${accordianChildId}`} aria-expanded="false" aria-controls={accordianChildId}>
          {title}
        </button>
      </h2>
      <div id={accordianChildId} className="accordion-collapse collapse" aria-labelledby={accordianId} data-bs-parent={`#${accordianParentId}`} style={{ backgroundSize: 'cover' }}>
        <div className="accordion-body" style={{ backgroundSize: 'cover' }}>
          {children}
        </div>
      </div>
    </div>
  // </div>
  );
};

export default Accordian;
