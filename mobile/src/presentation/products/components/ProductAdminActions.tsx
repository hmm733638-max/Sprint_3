import { View } from 'react-native';
import { AppButton } from '../../../shared/components/AppButton';
import { InfoBanner } from '../../../shared/components/InfoBanner';
import { useAppTheme } from '../../../shared/theme/useAppTheme';
import { confirmDestructiveAction, showSuccessFeedback } from '../../common/utils/platformFeedback';

interface ProductAdminActionsProps {
  readonly deleting: boolean;
  readonly deleteErrorMessage: string | null;
  readonly onEdit: () => void;
  readonly onDelete: () => Promise<boolean>;
  readonly onDeleted: () => void;
}

export function ProductAdminActions({
  deleting,
  deleteErrorMessage,
  onEdit,
  onDelete,
  onDeleted,
}: ProductAdminActionsProps) {
  const theme = useAppTheme();

  const confirmDelete = () => {
    confirmDestructiveAction(
      'Eliminar producto',
      '¿Estás seguro de eliminar este producto?',
      'Eliminar',
      async () => {
        const deleted = await onDelete();

        if (!deleted) {
          return;
        }

        showSuccessFeedback('Producto eliminado', 'Producto eliminado (Simulación)');
        onDeleted();
      },
    );
  };

  return (
    <View style={{ gap: theme.spacing.sm }}>
      {deleteErrorMessage ? <InfoBanner message={deleteErrorMessage} tone="danger" /> : null}
      <AppButton title="Editar producto" variant="secondary" disabled={deleting} onPress={onEdit} />
      <AppButton
        title="Eliminar producto"
        variant="danger"
        loading={deleting}
        onPress={confirmDelete}
      />
    </View>
  );
}
