import React from 'react';
import Gallery, { renderImageClickHandler } from 'react-photo-gallery';
import GridImage from './components/GridImage';

interface Props {
  // eslint-disable-next-line react/require-default-props
  images: {
    alt: string;
    caption: string;
    height: number;
    width: number;
    src: string;
  }[];
  handleClick: renderImageClickHandler;
}

const ImageMosaic: React.FC<Props> = ({ images, handleClick }) => (
  <div className="gallery-container">
    <Gallery
      columns={(containerWidth) => {
        let columns = 1;
        if (containerWidth >= 420) columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;

        return columns;
      }}
      onClick={handleClick}
      photos={images}
      margin={10}
      // padding={0}
      direction="column"
      renderImage={GridImage}
    />
  </div>
);

export default ImageMosaic;
