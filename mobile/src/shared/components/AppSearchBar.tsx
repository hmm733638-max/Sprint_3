import { ReactNode } from 'react';

import { AppInput } from './AppInput';

interface AppSearchBarProps {
  readonly value: string;

  readonly onChangeText: (value: string) => void;

  readonly placeholder?: string;

  readonly leadingAccessory?: ReactNode;

  readonly trailingAccessory?: ReactNode;

  readonly accessibilityLabel?: string;
}

export function AppSearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar...',
  leadingAccessory,
  trailingAccessory,
  accessibilityLabel = 'Buscar',
}: AppSearchBarProps) {
  return (
    <AppInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
      accessibilityLabel={accessibilityLabel}
      leftAccessory={leadingAccessory}
      rightAccessory={trailingAccessory}
    />
  );
}
