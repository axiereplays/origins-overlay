import { Client } from "pg";
import { IGetBattleData } from "./interfaces";

// get the battle from the db, return it as props for the BattleComponent
export default async function getBattle(bid?: string) {
  console.log(`getting battle ${bid ? bid : 'latest'}`);
  try {
    const battle = await new Promise<IGetBattleData>(async (resolve, reject) => {
      console.log('creating client');
      const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: +process.env.POSTGRES_PORT! ?? 5432,
        // statement_timeout: 1000
      })

      client.on('error', (err) => {
        console.log('error', err);
        reject(err);
      });

      console.log('connecting...');

      client.connect((err) => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
          // console.log(`connected to db ${process.env.PGDATABASE}`);
          const query = bid ? `SELECT * FROM battles WHERE "battle_uuid" = '${bid}'` : `SELECT * FROM battles WHERE "replayed" = '1' ORDER BY replayed_at DESC LIMIT 1`;
          client.query<IGetBattleData>(query,
            (err, res) => {
              // end the connection
              client.end();
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

      // 3 secs timeout
      setTimeout(() => {
        reject('get battle timeout');
      }, 3000);
    });

    // re order fighters, so the first client is always on the left side
    const first_client_fighters = battle.client_ids[0] === battle.user_id ? battle.first_client_fighters : battle.second_client_fighters;
    const second_client_fighters = battle.client_ids[0] === battle.user_id ? battle.second_client_fighters : battle.first_client_fighters;

    console.log(`returning battle ${battle.battle_uuid}`);
    return {
      props: {
        battle: {
          battle_uuid: battle.battle_uuid,
          client_ids: battle.client_ids,
          first_client_fighters: first_client_fighters,
          second_client_fighters: second_client_fighters,
        }
      }
    };
  } catch (error) {
    console.error(error);
  };

  return {
    props: {
      battle: null,
    }
  }
}