import React from 'react';
import styled from 'styled-components';
import { animated, useTransition } from '@tim-soft/react-spring-web';
import ButtonControl from './ButtonControl';

interface Props {
  onClick: () => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
}

const ArrowButtonLeft: React.FC<Props> = ({ onClick, disabled }) => {
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
          <Button className="btnLleft" type="button" onClick={onClick}>
            <i className="fa fa-chevron-left" />
          </Button>
        </animated.div>
        ),
      )}
    </>
  );
};

export default ArrowButtonLeft;

const Button = styled(ButtonControl)`
  position: absolute;
  left: 0;
`;
