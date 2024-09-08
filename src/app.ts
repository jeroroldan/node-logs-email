import 'dotenv/config';
import { Server } from "./presentation/server";

(async() => {
  main();
})();

async function main(){
  Server.start();
  // console.log(envs.PORT);
}