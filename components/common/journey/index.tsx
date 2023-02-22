import React from 'react';

interface IProps{
    title:JSX.Element | string
    descriprion: JSX.Element | string
    imgSrc:string
    progressSvg?:JSX.Element
    imgWrapperClasses?: string
    hidePregressImg?:boolean
}
const Journey:React.FC<IProps> = (props) => {
  const {
    title, descriprion, imgSrc, progressSvg, imgWrapperClasses, hidePregressImg,
  } = props;
  return (
    <div className="row align-items-center py-3 py-lg-5">
      <div className={`col-lg-6 d-flex justify-content-center align-items-center ${imgWrapperClasses}`}>
        <img className="mb-5 mb-lg-0 img-fluid buyers-steps-img" src={imgSrc} alt="" />
      </div>
      <div className="col-lg-6 mb-sm-30 order-lg-1">
        <div className="position-relative d-flex">
          {!hidePregressImg && progressSvg }
          <div>
            {
              typeof title === 'string' ? <h3>{title}</h3> : title
            }
            {
                typeof descriprion === 'string' ? (
                  <p className="lead">
                    {descriprion}
                  </p>
                ) : descriprion
            }

          </div>
        </div>
      </div>
    </div>
  );
};

Journey.defaultProps = {
  progressSvg: (
    <div className="down-marker__area">
      <svg
        className="down-arrow__circle-svg"
        stroke="var(--secondary-color)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <line fill="none" strokeMiterlimit={10} x1={12} y1={2} x2={12} y2={22} />
        <polyline fill="none" strokeMiterlimit={10} points="19,15 12,22 5,15" />
      </svg>
    </div>),
  imgWrapperClasses: '',
  hidePregressImg: false,
};

export default Journey;
