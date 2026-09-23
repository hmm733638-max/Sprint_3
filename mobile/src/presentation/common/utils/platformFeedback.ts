import { Alert, Platform, ToastAndroid } from 'react-native';

type BrowserDialogs = typeof globalThis & {
  readonly alert?: (message: string) => void;
  readonly confirm?: (message: string) => boolean;
};

const browserDialogs = globalThis as BrowserDialogs;

export function showSuccessFeedback(title: string, message: string): void {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
    return;
  }

  if (Platform.OS === 'web' && typeof browserDialogs.alert === 'function') {
    browserDialogs.alert(`${title}\n\n${message}`);
    return;
  }

  Alert.alert(title, message);
}

export function confirmDestructiveAction(
  title: string,
  message: string,
  confirmLabel: string,
  onConfirm: () => Promise<void>,
): void {
  if (Platform.OS === 'web' && typeof browserDialogs.confirm === 'function') {
    const confirmed = browserDialogs.confirm(`${title}\n\n${message}`);

    if (confirmed) {
      void onConfirm();
    }

    return;
  }

  Alert.alert(title, message, [
    {
      text: 'Cancelar',
      style: 'cancel',
    },
    {
      text: confirmLabel,
      style: 'destructive',
      onPress: () => {
        void onConfirm();
      },
    },
  ]);
}
