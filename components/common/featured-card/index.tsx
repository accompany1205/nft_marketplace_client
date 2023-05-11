import React from 'react';

interface IProps{
    iClassName:string
    title:string
    description:string
    bgIClassName:string
    variant?: 'small' | 'medium'
}
const FeatureCard: React.FC<IProps> = (props) => {
  const {
    title, iClassName, description, bgIClassName, variant,
  } = props;
  return (
    <div className={`mb-4 col-md-6 ${variant === 'small' ? 'col-lg-3' : ''} mb-sm-30`}>
      <div className="feature-box f-boxed style-3">
        <i className={iClassName} />
        <div className="text">
          <h4 className="wow fadeInUp">{title }</h4>
          <p className="wow fadeInUp" data-wow-delay=".25s">
            {description}
          </p>
        </div>
        <i className={bgIClassName} />
      </div>
    </div>
  );
};

FeatureCard.defaultProps = {
  variant: 'small',
};

export default FeatureCard;
