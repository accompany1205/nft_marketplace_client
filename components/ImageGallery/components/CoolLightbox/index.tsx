/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import Lightbox from 'react-spring-lightbox';
import styled from 'styled-components';
import Color from 'color';
import { ArrowButton, ArrowButtonLeft, Header } from './components';

interface Props {
  images?: { src: string; alt: string }[];
  currentImageIndex?: number;
  setCurrentIndex?: (val: number) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const CoolLightbox: React.FC<Props> = ({
  images = [],
  currentImageIndex = 0,
  setCurrentIndex = () => {},
  isOpen = false,
  onClose = () => {},
}) => {
  const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () => currentImageIndex + 1 < images.length
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
      renderPrevButton={() => (
        <ArrowButtonLeft onClick={gotoPrevious} />
      )}
      renderNextButton={() => (
        <ArrowButton onClick={gotoNext} />
      )}
    />
  );
};

export default CoolLightbox;

const StyledLightbox = styled(Lightbox)`
  background: ${({ theme }) => Color(theme.accentColor).alpha(0.95).hsl().string()};
  * ::selection {
    background: ${({ theme }) => theme.pageContentSelectionColor};
  }
  * ::-moz-selection {
    background: ${({ theme }) => new Color(theme.pageContentSelectionColor).darken(0.57).hex()};
  }
`;
