export type RootStackParamList = {
  SessionLoading: undefined;

  Login: undefined;

  Authenticated: undefined;
};

export type AuthenticatedStackParamList = {
  RoleTabs: undefined;

  ProductDetail: {
    readonly productId: number;
  };
};

export type ClientTabParamList = {
  ClientCatalog: undefined;

  ClientCart: undefined;

  ClientProfile: undefined;
};

export type AdminTabParamList = {
  AdminCatalog: undefined;

  AdminAddProduct: undefined;

  AdminInventory: undefined;

  AdminUsers: undefined;

  AdminAuditCart: undefined;

  AdminProfile: undefined;
};

export type AuditorTabParamList = {
  AuditorCatalog: undefined;

  AuditorUsers: undefined;

  AuditorCartAudit: undefined;

  AuditorProfile: undefined;
};
