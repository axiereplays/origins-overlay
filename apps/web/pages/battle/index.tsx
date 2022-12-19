/* eslint-disable turbo/no-undeclared-env-vars */

import { Client } from 'pg';
import BattlePage from './[bid]';

export default BattlePage;

export async function getStaticProps(context: any) {
  try {
    const client = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: Number(process.env.PGPORT),
    });
    client.connect();
    const result = await client.query(
      `SELECT * FROM battles WHERE "replayed" = '1' ORDER BY replayed_at DESC LIMIT 1`
    );
    client.end();

    if (result.rows.length === 0) {
      return {
        notFound: true,
      };
    }

    const battleProps = {
      battle_uuid: result.rows[0].battle_uuid,
      client_ids: result.rows[0].client_ids,
      first_client_fighters: JSON.parse(result.rows[0].first_client_fighters),
      second_client_fighters: JSON.parse(result.rows[0].second_client_fighters),
    };

    return {
      props: {
        battle: battleProps ?? null,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    console.log(err);
  }
}
