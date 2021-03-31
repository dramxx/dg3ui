import React from 'react';

interface Props {
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError() {
    return { hasError: true } as State;
  }

  public componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error(error, info);
  }

  public renderDefaultFallback() {
    return <span>An error occurred.</span>;
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || this.renderDefaultFallback();
    } else {
      return this.props.children;
    }
  }
}
