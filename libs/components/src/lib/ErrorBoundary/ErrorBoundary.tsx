import React, { Component, ComponentType, FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  color: ${(props) => props.theme.colors.red};
  padding: ${(props) => props.theme.spacing.normal};
  max-height: 100%;
  overflow: hidden;
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <StyledError>Error: {this.state.message}</StyledError>;
    } else {
      return this.props.children;
    }
  }
}

export const withErrorBoundary = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return (props: P) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};
