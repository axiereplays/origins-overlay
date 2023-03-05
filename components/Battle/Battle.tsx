import { IGetBattleData } from "@/lib/interfaces";
import { Cardset } from "@/components/Cardset/Cardset";
import styles from './Battle.module.css';

export interface BattleProps {
  battle: IGetBattleData | null
}

export default function BattleOverlay({ battle }: BattleProps) {

  if (!battle) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 600,
            }}
          >
            Battle not found
          </h2>
        </div>
      </div>
    );
  }

  // Calculate the time difference in milliseconds
  var timeDiff = Math.abs(new Date().getTime() - battle.ended_time);

  // Calculate the time difference in hours and minutes
  var diffHours = Math.floor(timeDiff / 3600000);
  var diffMinutes = Math.floor((timeDiff % 3600000) / 60000);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 600,
          }}
        >
          {/* display the date difference between the battle and now */}
          Played {diffHours < 1 ? diffMinutes + ' minutes ago' : diffHours + ' hours and ' + diffMinutes + ' minutes ago'}
        </h2>
      </div>

      <div className={styles.left}>
        {battle && <Cardset fighters={battle.first_client_fighters} />}
      </div>
      <div className={styles.right}>
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