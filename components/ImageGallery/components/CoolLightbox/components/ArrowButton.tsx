import React from 'react';
import styled from 'styled-components';
import { animated, useTransition } from '@tim-soft/react-spring-web';
import ButtonControl from './ButtonControl';

interface Props {
  onClick: () => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
}

const ArrowButton: React.FC<Props> = ({ onClick, disabled = false }) => {
  const transitions = useTransition(!disabled, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {(transitions || []).map(
        ({ item, key, props }) => item && (
        <animated.div
          key={key}
          style={{
            ...props,
            zIndex: 999,
            opacity: (props.opacity || 0) as unknown as number,
          }}
        >
          <Button
            className="btnLright"
                // position={position}
            type="button"
            onClick={onClick}
          >
            <i className="fa fa-chevron-right" />
          </Button>
        </animated.div>
        ),
      )}
    </>
  );
};

export default ArrowButton;

const Button = styled(ButtonControl)`
  position: absolute;
  right: 0;
`;
