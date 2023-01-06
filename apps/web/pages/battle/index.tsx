/* eslint-disable turbo/no-undeclared-env-vars */
import { Client } from 'pg';
import { useState, useEffect } from 'react';
import { BattleTitle, Cardset } from 'ui';
import { IBattleData } from '../../interfaces';
import styles from './battle.module.css';

function BattlePage(props: { battle: IBattleData | null }) {
  const [battle, setBattle] = useState<null | IBattleData>(null);

  useEffect(() => {
    setBattle(props.battle);
    console.log(props.battle);
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
          {battle && (
            <BattleTitle>
              <>
                {battle.battle_uuid}
              </>
            </BattleTitle>
          )}
        </h2>
      </div>
      {/* <div className={styles.subheader}></div> */}
      <div className={styles.left}>
        {/* TODO: fix wrong side sometimes */}
        {battle && <Cardset fighters={battle.first_client_fighters} />}
      </div>
      <div className={styles.right}>
        {/* TODO: fix wrong side sometimes */}
        {battle && <Cardset fighters={battle.second_client_fighters} />}
      </div>
      {/* <div className={styles.center}></div> */}
      <div className={styles.footer}>
        {/* <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas amet
          iure sint, exercitationem temporibus perspiciatis ipsam culpa quam
          voluptates iusto vel omnis pariatur quasi earum necessitatibus facere
          quae iste! Perspiciatis.
        </h3> */}
      </div>
    </div>
  );
}

export default BattlePage;

export async function getServerSideProps(context: any) {
  console.log('getStaticProps');
  let result: any = null;
  try {
    const battles = await new Promise(async (resolve, reject) => {
      console.log('process');
      const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: Number(process.env.PGPORT),
        statement_timeout: 3000
      })

      client.on('error', (err) => {
        console.log('error', err);
        reject(err);
      });

      console.log('connect');
      client.connect((err) => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
          console.log('connected')
          client.query(`SELECT * FROM battles WHERE "replayed" = '1' ORDER BY replayed_at DESC LIMIT 1`,
            (err, res) => {
              // console.log(res);
              client.end();
              if (err instanceof Error) {
                console.error(err.stack)
                reject(err);
              } else {
                console.log(res.rows)
                resolve(res);
              }
            })
        }
      })

      setTimeout(() => {
        reject('timeout');
      }, 3000);
    });

    // console.log(battles);

    if (battles && (battles as any).rowCount > 0) {
      result = (battles as any).rows;
    }

  } catch (error) {
    console.log(error);
  }

  console.log('result', result);

  if (result === null) {
    return {
      props: {
        battle: null,
      }
    };
  }

  return {
    props: {
      battle: {
        battle_uuid: result[0].battle_uuid,
        client_ids: result[0].client_ids,
        first_client_fighters: JSON.parse(result[0].first_client_fighters),
        second_client_fighters: JSON.parse(result[0].second_client_fighters),
      }
    }
  };
}
