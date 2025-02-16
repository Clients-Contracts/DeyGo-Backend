export interface OAuthProfile {
    id: string;
    displayName?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
    emails?: { value: string }[];
  }
  