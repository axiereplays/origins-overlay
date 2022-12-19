import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BattleTitle, Cardset } from 'ui';
import { Client } from 'pg';
import styles from './battle.module.css';

interface IFighter {
  gene: string;
  axie_id: number;
  axie_type: string;
  runes: string[];
  charms: {
    eyes: string;
    mouth: string;
    ears: string;
    horn: string;
    back: string;
    tail: string;
  };
}

interface IBattleData {
  battle_uuid: string;
  client_ids: string[];
  first_client_fighters: IFighter[];
  second_client_fighters: IFighter[];
}

function BattlePage(props: { battle: IBattleData | null }) {
  const [battle, setBattle] = useState<null | IBattleData>(null);

  useEffect(() => {
    setBattle(props.battle);
  }, [props.battle]);

  if (battle === null) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 600,
            }}
          >
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 600,
          }}
        >
          {battle && <BattleTitle battleUUID={battle.battle_uuid} />}
        </h2>
      </div>
      {/* <div className={styles.subheader}></div> */}
      <div className={styles.left}>
        {battle && <Cardset fighters={battle.first_client_fighters} />}
      </div>
      <div className={styles.right}>
        {battle && <Cardset fighters={battle.second_client_fighters} />}
      </div>
      {/* <div className={styles.center}></div> */}
      <div className={styles.footer}>
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas amet
          iure sint, exercitationem temporibus perspiciatis ipsam culpa quam
          voluptates iusto vel omnis pariatur quasi earum necessitatibus facere
          quae iste! Perspiciatis.
        </h3>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  };
}

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
      `SELECT * FROM battles WHERE battle_uuid = $1`,
      [context.params.bid]
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

export default BattlePage;
