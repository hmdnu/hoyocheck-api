export const Env = {
  port: Bun.env.PORT,
  dbHost: Bun.env.DB_HOST,
  dbPort: Bun.env.DB_PORT,
  dbPassword: Bun.env.DB_PASSWORD,
  dbName: Bun.env.DB_NAME,
  dbUser: Bun.env.DB_USER,
};

export const Endpoints = [
  {
    game: "Genshin Impact",
    url: "https://sg-hk4e-api.hoyolab.com/event/sol/sign?act_id=e202102251931481",
  },
  {
    game: "Zenless Zone Zero",
    url: "https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/sign?act_id=e202406031448091",
  },
];

export const ResponseCode = {
  success: 0,
  alreadyCheckedIn: -5003,
  cookieInvalid: -100,
  gameNotFound: -10002,
};

export const ResponseData = [
  {
    code: ResponseCode.success,
    message: "You are succesfully checked in",
  },
  {
    code: ResponseCode.alreadyCheckedIn,
    message: "You are already checked in for today",
  },
  {
    code: ResponseCode.cookieInvalid,
    message: "Your cookie is invalid, try setting up again",
  },
  {
    code: ResponseCode.gameNotFound,
    message: "Game not found, you have not played this game yet",
  },
];
