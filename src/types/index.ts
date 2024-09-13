export interface TData {
  data: any;
  message: string;
  retcode: number;
  game: string;
}

export type TEndpoint = {
  game: string;
  url: string;
};

export type TResponses = {
  game: string;
  message: string;
  retcode: number;
};

export type TUser = {
  id: string;
  username: string;
  discordUserId: string;
  ltokenV2: string;
  ltuidV2: string;
};

export type TQuery = {
  text: string;
  values: string[];
};

export type TResultData = {
  id: string;
  username: string;
  discordUserId: string;
  data: TData[];
};
