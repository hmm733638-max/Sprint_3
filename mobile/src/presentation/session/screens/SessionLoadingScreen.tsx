import { LoadingView } from '../../../shared/components/LoadingView';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';

export function SessionLoadingScreen() {
  return (
    <ScreenContainer>
      <LoadingView message="Iniciando Changarrito..." />
    </ScreenContainer>
  );
}
