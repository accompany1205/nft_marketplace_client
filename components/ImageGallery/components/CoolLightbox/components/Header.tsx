import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonControl from './ButtonControl';
import {Images} from "../index";
import Color from "color";

export interface Props {
  currentImageIndex: number | undefined,
  onClose: React.Dispatch<React.SetStateAction<boolean>>,
  images: Images[]
}
const LightboxHeader = ({ images, onClose }) => (
  <TopHeaderBar>
    <RightSideContainer>
      <PageIndicator>
        {currentIndex + 1}
        {' '}
        /
        {images.length}
      </PageIndicator>
      <CloseButton className="closeL" onClick={onClose} type="button">
        <i className="fa fa-close" />
      </CloseButton>
    </RightSideContainer>
  </TopHeaderBar>
);

LightboxHeader.propTypes = {
  onClose: PropTypes.func,
  currentIndex: PropTypes.number,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default LightboxHeader;

const PageIndicator = styled.span`
  white-space: nowrap;
  min-width: 60px;
  text-align: center;
`;

const RightSideContainer = styled.div`
  width: 117px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(ButtonControl)`
  height: 100%;
  display: flex;
  border-left-color: ${({ theme }) => theme.headerNavFontColor};
  color: inherit;
`;

const TopHeaderBar = styled.header`
  z-index: 10;
  cursor: auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 2px 10px 20px;
  color: ${({ theme }) => theme.headerNavFontColor};
  background-color: ${({ theme }) => Color(theme.pageBackgroundColor)
    .alpha(0.5)
    .hsl()
    .string()};
  > * {
    height: inherit;
  }
`;
