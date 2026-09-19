import { useEffect, useState } from 'react';

import { Animated, DimensionValue } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

interface SkeletonBoxProps {
  readonly width?: DimensionValue;

  readonly height: number;

  readonly borderRadius?: number;
}

export function SkeletonBox({ width = '100%', height, borderRadius }: SkeletonBoxProps) {
  const theme = useAppTheme();

  const [opacity] = useState(() => new Animated.Value(0.45));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        width,
        height,

        opacity,

        borderRadius: borderRadius ?? theme.radii.md,

        backgroundColor: theme.colors.surfaceMuted,
      }}
    />
  );
}
