import type { FetchError } from "ofetch";

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

export type TFetchResponse = {
  data: TData[] | null;
  error: FetchError | null;
};

export type TUser = {
  id: string;
  username: string;
  discord_user_id: string;
  ltoken_v2: string;
  ltuid_v2: string;
};

export type TQuery = {
  text: string;
  values: string[];
};

export type TResultData = {
  id: string;
  username: string;
  discord_user_id: string;
  data: TData[];
};
