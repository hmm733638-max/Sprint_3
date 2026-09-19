import { UserSession } from '../domain/entities/UserSession';

import { UserRole } from '../domain/enums/UserRole';

import { LogoutViewModel } from '../presentation/profile/viewmodels/LogoutViewModel';

import { AdminNavigator } from './AdminNavigator';
import { AuditorNavigator } from './AuditorNavigator';
import { ClientNavigator } from './ClientNavigator';

interface AuthenticatedNavigatorProps {
  readonly session: UserSession;

  readonly logoutViewModel: LogoutViewModel;

  readonly onLogoutCompleted: () => void;
}

export function AuthenticatedNavigator({
  session,
  logoutViewModel,
  onLogoutCompleted,
}: AuthenticatedNavigatorProps) {
  switch (session.role) {
    case UserRole.ADMIN:
      return (
        <AdminNavigator
          session={session}
          logoutViewModel={logoutViewModel}
          onLogoutCompleted={onLogoutCompleted}
        />
      );

    case UserRole.AUDITOR:
      return (
        <AuditorNavigator
          session={session}
          logoutViewModel={logoutViewModel}
          onLogoutCompleted={onLogoutCompleted}
        />
      );

    case UserRole.CLIENT:
      return (
        <ClientNavigator
          session={session}
          logoutViewModel={logoutViewModel}
          onLogoutCompleted={onLogoutCompleted}
        />
      );
  }
}
