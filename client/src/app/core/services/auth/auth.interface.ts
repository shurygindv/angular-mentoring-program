
export interface UserInfo {
    id: string;
    token: string;
    firstName: string;
    lastName: string;
  }

export interface UserFullInfo {
    name: {
      last: string;
      first: string;
    };
  }
