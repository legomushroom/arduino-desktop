export enum IUserStatus {
  Pending,
  Accepted,
  Deleted,
  Active,
};

interface IAttribute {
  value: any;
};

interface IProvider {
  id: string;
  displayName: string;
  username: string;
  profileUrl: string;
  emails: IAttribute[];
  photos: IAttribute[];
};

export interface IUser {
  id: string;
  initialProvider: string;
  isSelected: boolean;
  status: string;
  signupTime: number,
  acceptedTime?: number,
  providers: {
    [key: string]: IProvider;
  }
};

export interface ISelectedUsers {
  [key: string]: boolean;
};

export declare type IUsersList = IUser[];
