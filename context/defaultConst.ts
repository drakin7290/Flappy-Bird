export const CURRENT_LANG_KEY: string = 'current_lang';

export interface USER_AUTH_IF {
  TOKEN: string;
  EMAIL: string;
  ID: string;
  NAME: string;
  AVATAR: string;
  USERNAME: string;
}

export const USER_AUTH: USER_AUTH_IF = {
  TOKEN: 'auth_user_token',
  EMAIL: 'auth_user_email',
  ID: 'auth_user_id',
  NAME: 'auth_user_name',
  AVATAR: 'auth_user_avatar',
  USERNAME: 'auth_user_username',
};

// export const IS_DARK_MODE_KEY = 'is_dark_mode_key';
// export const MOBILE_WIDTH = 1024;
// export const PC_WIDTH = 1025;
