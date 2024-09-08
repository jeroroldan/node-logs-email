import 'dotenv/config';
import { Server } from "./presentation/server";
import { envs } from './config/envs.plugin';

(async() => {
  main();
})();

async function main(){
  // Server.start();
  console.log(envs.PORT);
}