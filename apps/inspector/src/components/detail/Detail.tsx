import React from 'react';
import ReactDOM from 'react-dom';

import { StyledDetail, StyledTabButton } from './styles';

interface DetailProps<T> {
  defaultTab: T;
  children: React.ReactElement[];
}

export default function Detail<T>(props: DetailProps<T>) {
  const { defaultTab, children } = props;

  const tabContent = React.useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = React.useState<T>(defaultTab);
  const [isMounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <StyledDetail>
      {isMounted && (
        <div>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              isActive: child.props.id === activeTab,
              onClick: setActiveTab,
              tabContent: tabContent.current,
            })
          )}
        </div>
      )}
      <div style={{ width: '100%', height: '100%' }} ref={tabContent} />
    </StyledDetail>
  );
}

interface TabProps<T> {
  id: T;
  label: string;
  children: React.ReactElement;
}

interface TabInjectedProps<T> {
  isActive: boolean;
  onClick: (id: T) => void;
  tabContent: Element;
}

function Tab<T>(props: TabProps<T>) {
  const { id, label, children, isActive, onClick, tabContent } = props as TabProps<T> & TabInjectedProps<T>;
  return (
    <>
      <StyledTabButton isActive={isActive} onClick={() => onClick(id)}>
        {label}
      </StyledTabButton>
      {isActive && ReactDOM.createPortal(children, tabContent)}
    </>
  );
}

Detail.Tab = Tab;
