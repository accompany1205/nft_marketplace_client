import React from 'react';

interface IProps{
    title: string
    description:string
    readMoreTarget:string
}
const FaqSectionCard:React.FC<IProps> = (props) => {
  const { title, description, readMoreTarget } = props;
  return (
    <div className="col-lg-4 col-md-6 mb25">
      <div className="feature-box h-100 f-boxed style-3 text-center">
        <div className="text">
          <h4>{title}</h4>
          <p>{description}</p>
          <a href={`#${readMoreTarget}`} className="smooth-scroll btn-main">Read more</a>
        </div>
      </div>
    </div>
  );
};

export default FaqSectionCard;
