import { useState, useEffect } from "react";
import { BattleTitle, Cardset } from "ui";
import styles from './battle.module.css';
import { IBattleData } from "./interfaces";

export default function BattleComponent(props: { battle: IBattleData | null }) {
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
              <>{battle.battle_uuid}</>
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