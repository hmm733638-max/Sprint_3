import { PropsWithChildren, ReactNode } from 'react';

import { Modal, Pressable, Text, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

interface AppModalProps extends PropsWithChildren {
  readonly visible: boolean;

  readonly title: string;

  readonly description?: string;

  readonly icon?: ReactNode;

  readonly actions?: ReactNode;

  readonly onRequestClose: () => void;
}

export function AppModal({
  visible,
  title,
  description,
  icon,
  actions,
  children,
  onRequestClose,
}: AppModalProps) {
  const theme = useAppTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: theme.spacing.xl,
          backgroundColor: theme.colors.overlay,
        }}
      >
        <Pressable
          style={{
            position: 'absolute',
            inset: 0,
          }}
          onPress={onRequestClose}
          accessibilityLabel="Cerrar modal"
        />

        <View
          accessibilityViewIsModal
          style={{
            backgroundColor: theme.colors.surface,

            borderRadius: theme.radii.modal,

            padding: theme.spacing.xl,

            gap: theme.spacing.md,

            ...theme.shadows.lg,
          }}
        >
          {icon ? (
            <View
              style={{
                alignItems: 'center',
              }}
            >
              {icon}
            </View>
          ) : null}

          <Text
            style={{
              color: theme.colors.textPrimary,

              fontSize: theme.typography.fontSize.xxl,

              lineHeight: theme.typography.lineHeight.xxl,

              fontWeight: theme.typography.fontWeight.bold,

              textAlign: 'center',
            }}
          >
            {title}
          </Text>

          {description ? (
            <Text
              style={{
                color: theme.colors.textSecondary,

                fontSize: theme.typography.fontSize.md,

                lineHeight: theme.typography.lineHeight.md,

                textAlign: 'center',
              }}
            >
              {description}
            </Text>
          ) : null}

          {children}

          {actions ? (
            <View
              style={{
                marginTop: theme.spacing.sm,

                gap: theme.spacing.sm,
              }}
            >
              {actions}
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
