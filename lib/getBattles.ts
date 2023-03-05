import { BattleProps } from "@/components/Battle/Battle";
import { Client } from "pg";
import { IGetBattleData } from "./interfaces";

// get the battle from the db, return it as props for the BattleComponent
export default async function getBattle(bid?: string): Promise<BattleProps> {
  console.log(`getting battle ${bid ? bid : 'latest'}`);
  try {
    const battleData = await new Promise<IGetBattleData>(async (resolve, reject) => {
      // console.log('connecting to db');

      const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: +(process.env.POSTGRES_PORT ?? 5432),
        statement_timeout: 1000
      })

      // 3 secs timeout
      const timeout = setTimeout(() => {
        void client.end();
        reject('get battle timeout');
      }, 3000);

      client.on('error', (err) => {
        console.log('error', err);
        void client.end();
        clearTimeout(timeout);
        reject(err);
      });

      client.connect((err) => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
          // console.log(`connected to db ${process.env.POSTGRES_DB}`);
          const query = bid ? `SELECT * FROM battles WHERE "battle_uuid" = '${bid}'` : `SELECT * FROM battles WHERE "replayed" = '1' ORDER BY replayed_at DESC LIMIT 1`;
          client.query<IGetBattleData>(query,
            (err, res) => {
              // end the connection
              void client.end();
              clearTimeout(timeout);
              // resolve the promise
              if (err instanceof Error) {
                console.error(err.stack)
                reject(err.stack);
              } else if (res.rows.length === 0) {
                reject('no battle found');
              } else {
                resolve(res.rows[0]);
              }
            })
        }
      })

    });

    // re order fighters, so the first client is always on the left side
    const first_client_fighters = battleData.client_ids[0] === battleData.user_id ? battleData.first_client_fighters : battleData.second_client_fighters;
    // console.log(`first client fighters:`, first_client_fighters);
    const second_client_fighters = battleData.client_ids[0] === battleData.user_id ? battleData.second_client_fighters : battleData.first_client_fighters;
    // console.log(`returning battle ${battleData.battle_uuid}`);

    const battle: IGetBattleData = {
      ...battleData,
      started_time: new Date(battleData.started_time).getTime(),
      created_at: new Date(battleData.created_at).getTime(),
      ended_time: new Date(battleData.ended_time).getTime(),
      battle_uuid: battleData.battle_uuid,
      client_ids: battleData.client_ids,
      first_client_fighters: first_client_fighters,
      second_client_fighters: second_client_fighters,
    }

    return { battle }

  } catch (error) {
    console.error(error);
    return { battle: null }
  };
}