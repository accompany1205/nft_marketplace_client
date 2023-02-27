import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-spring-lightbox';
import styled from 'styled-components';
import Color from 'color';
import { ArrowButton, ArrowButtonleft, Header } from './components';
export interface Images {
   src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
}
export interface Props {
  currentImageIndex: number | undefined,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  isOpen: boolean | null | undefined,
  onClose: React.Dispatch<React.SetStateAction<boolean>>,
  images: Images[]
}
const CoolLightbox = ({
  images,
  currentImageIndex,
  setCurrentIndex,
  isOpen,
  onClose,
}:Props) => {
  const gotoPrevious = () => !!currentImageIndex && currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  const gotoNext = () => !!currentImageIndex && currentImageIndex + 1 < images.length
    && setCurrentIndex(currentImageIndex + 1);

  return (
      <StyledLightbox
        isOpen={isOpen}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        onClose={onClose}
        images={images}
        currentIndex={currentImageIndex}
        singleClickToZoom
        renderHeader={() => (
          <Header
            images={images}
            currentIndex={currentImageIndex}
            onClose={onClose}
          />
        )}
        renderPrevButton={({ canPrev }) => (
          <ArrowButtonleft
            onClick={gotoPrevious}
            disabled={!canPrev}
          />
        )}
        renderNextButton={({ canNext }) => (
          <ArrowButton
            onClick={gotoNext}
            disabled={!canNext}
          />
        )}
      />
  );
};

CoolLightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  ),
  currentImageIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CoolLightbox;

const StyledLightbox = styled(Lightbox)`
  background: ${({ theme }) => Color(theme.accentColor)
    .alpha(0.95)
    .hsl()
    .string()};
  * ::selection {
    background: ${({ theme }) => theme.pageContentSelectionColor};
  }
  * ::-moz-selection {
    background: ${({ theme }) => new Color(theme.pageContentSelectionColor).darken(0.57).hex()};
  }
`;
