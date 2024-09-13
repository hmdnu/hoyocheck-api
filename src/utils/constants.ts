export const Endpoints = [
  {
    game: "Genshin Impact",
    url: "https://sg-hk4e-api.hoyolab.com/event/sol/sign?act_id=e202102251931481",
  },
  {
    game: "Zenless Zone Zero",
    url: "https://sg-act-nap-api.hoyolab.com/event/luna/zzz/os/sign?act_id=e202406031448091",
  },
  {
    game: "Honkai Star rail",
    url: " https://sg-public-api.hoyolab.com/event/luna/os/sign?act_id=e202303301540311",
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
