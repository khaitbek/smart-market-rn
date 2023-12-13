interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  givem_name: string;
  family_naem: string;
  picture: string;
  locale: string;
}
interface LoginPayload {
  username: string;
  password: string;
}

export interface Root {
  projectId: number | null;
  token: string;
  user: User;
}

export interface User {
  account: unknown;
  address: string;
  akey: unknown;
  areaId: unknown;
  authSource: string;
  backupMobilePhone: string;
  clientType: unknown;
  eimzoAllowToLogin: string;
  email: string;
  fullName: string;
  hasBind: boolean;
  headerBirthDate: number;
  headerPassportNumber: string;
  id: number;
  level: number;
  locale: string;
  loggingLevel: string;
  messageType: unknown;
  mfo: unknown;
  mobilePhone: string;
  oblId: number;
  offerInfo: boolean;
  orgId: number;
  orgType: number;
  permissions: string[];
  photo: string;
  pinfl: string;
  postName: string;
  projectId: number;
  registeredWithEimzo: unknown;
  sellerInfo: boolean;
  sourceUpdateId: unknown;
  state: number;
  telegramId: unknown;
  theme: string;
  tin: number;
  type: unknown;
  typeActivity: unknown;
  updateId: number;
  username: string;
}
