import React from 'react';

interface IProps {
    bgImgUrl?:string
    title: string
    children?: JSX.Element[] | JSX.Element
}

const HeroSection:React.FC<IProps> = ({ bgImgUrl, title, children }) => (
  <section className="text-dark" data-bgimage={`url(${bgImgUrl})`} data-stellar-background-ratio=".2">
    <div className="center-y relative text-center" data-scroll-speed={4}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="col text-center">
              <div className="spacer-single" />
              <h1>{title}</h1>
              {children || <div className="spacer-20" />}
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

HeroSection.defaultProps = {
  children: undefined,
};

export default HeroSection;
