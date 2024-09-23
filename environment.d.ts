declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_AUTH_TOKEN: string;
        PORT?: string;
        PWD: string;
        REACT_APP_SCOPES : Array<string>;
        REACT_APP_AUTHCONFIG_CLIENTID : string;
        REACT_APP_AUTHCONFIG_AUTHORITY: string;
        REACT_APP_AUTH_ADMIN : string;
        REACT_APP_AUTH_MEMBER : string;
        REACT_APP_AUTH_VIEWER: string;
        REACT_APP_SYNC_LICENCE_KEY : string;
      }
    }
  }
  
  export {}