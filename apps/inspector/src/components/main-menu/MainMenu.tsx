import React from 'react';

import { EScreen } from '../../model';
import { StyledItem, StyledMainMenu } from './styles';

interface Props {
  screen: EScreen;
  onScreenChange: (screen: EScreen) => void;
}

export default function MainMenu(props: Props) {
  const { screen, onScreenChange } = props;

  const items = React.useMemo(() => {
    return [
      { key: EScreen.Instances, label: 'Instances' },
      { key: EScreen.Values, label: 'Values' },
      { key: EScreen.Workflows, label: 'Workflows' },
      { key: EScreen.GraphQL, label: 'GraphQL' },
    ];
  }, []);

  return (
    <StyledMainMenu>
      {items.map((item) => (
        <StyledItem
          key={item.key}
          onClick={() => onScreenChange(item.key)}
          style={{ fontWeight: screen === item.key ? 'bold' : 'normal' }}
        >
          {item.label}
        </StyledItem>
      ))}
    </StyledMainMenu>
  );
}
