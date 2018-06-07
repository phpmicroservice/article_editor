import Env from './env.js';
import Xitong_1 from './xitong';
import Xitongdev from './xitong.dev';

let Xitong;
if (Env === 'development') {
  Xitong = Xitongdev;
} else {
  Xitong = Xitong_1;
}

let config = {
  scoket_url: Xitong.scoket_url,
  file_url: Xitong.file_url,
  token_time: 1000 * 60 * 60 * 24 * 30
};
export default config;
