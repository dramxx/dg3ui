import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useCombinedRefs = (...refs): React.MutableRefObject<any> => {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

interface Props {
  indeterminate?: boolean;
  name: string;
}

export const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);

    useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [combinedRef, indeterminate]);

    return (
      <StyledCheckbox>
        <input type="checkbox" ref={combinedRef} {...rest} />
      </StyledCheckbox>
    );
  }
);

export const rowSelection = [
  {
    id: 'selection',
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    ),
    Cell: ({ row }) => (
      <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    ),
    simpleCell: true,
    width: 26,
  },
];
