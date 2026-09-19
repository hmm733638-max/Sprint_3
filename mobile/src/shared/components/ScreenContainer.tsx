import { PropsWithChildren } from 'react';

import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../theme/useAppTheme';

interface ScreenContainerProps extends PropsWithChildren {
  readonly scrollable?: boolean;

  readonly padded?: boolean;

  readonly contentStyle?: StyleProp<ViewStyle>;
}

export function ScreenContainer({
  children,
  scrollable = false,
  padded = true,
  contentStyle,
}: ScreenContainerProps) {
  const theme = useAppTheme();

  const baseContentStyle: ViewStyle = {
    flexGrow: 1,

    padding: padded ? theme.spacing.md : 0,

    backgroundColor: theme.colors.background,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: theme.colors.background,
      }}
    >
      {scrollable ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[baseContentStyle, contentStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            {
              flex: 1,
              ...baseContentStyle,
            },

            contentStyle,
          ]}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}
