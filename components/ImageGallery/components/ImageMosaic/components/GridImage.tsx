/* eslint-disable react/require-default-props */
import React from 'react';
import { renderImageClickHandler } from 'react-photo-gallery';
import styled from 'styled-components';

interface Props {
  key?: string;
  index: number;
  left?: number;
  top?: number;
  // containerHeight: number,
  onClick?: renderImageClickHandler | null;
  photo: {
    alt?: string;
    // caption: string;
    height: number;
    width: number;
    src: string;
  };
}

/**
 * A single image element in a masonry style image grid
 */
const GridImage: React.FC<Props> = ({
  key,
  index,
  left,
  top,
  photo,
  onClick,
}) => {
  const {
    height, width, src, alt,
  } = photo;
  return (
    <ImageContainer
      className="ConMainGimg"
      key={`${key}-${index}`}
      // index={index}
      onClick={(e) => onClick && onClick(e, { index })}
      style={{
        left,
        top,
        height,
        width,
      }}
    >
      <OverlayContainer className="MainGimg">
        <Image src={src} alt={alt} />
        <Caption className="overlayCap">
          {/* <span>{caption}</span> */}
        </Caption>
      </OverlayContainer>
    </ImageContainer>
  );
};

export default GridImage;

const Caption = styled.div`
  position: absolute;
`;

const OverlayContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const ImageContainer = styled.button`
  transition: border-color 0.2s linear;
  display: block;
  position: absolute;
  cursor: pointer;
  border-width: 0;
  border-color: transparent;
  border-style: solid;
  :hover {
    border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
  }
`;

const Image = styled.img`
  width: inherit;
  height: inherit;
  position: absolute;
`;
