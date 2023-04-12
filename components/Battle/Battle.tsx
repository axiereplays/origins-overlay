import { Cardset } from "@/components/Cardset/Cardset";
import styles from './Battle.module.css';
import { BattleLogResponse } from "@/lib/getUserBattleData";

export interface BattleProps {
  battle: BattleLogResponse
}

export default function BattleOverlay({ battle }: BattleProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <h2>{battle.battle_uuid}</h2> */}
      </div>
      {/* <BattleHeader title={`Played ${diffHours < 1 ? diffMinutes + ' minutes ago' : diffHours + ' hours and ' + diffMinutes + ' minutes ago'}`} /> */}
      <div className={styles.left}>
        <Cardset fighters={battle.first_client_fighters} />
      </div>
      <div className={styles.right}>
        <Cardset fighters={battle.second_client_fighters} />
      </div>
      <div className={styles.center}></div>
      <div className={styles.footer}></div>
    </div>
  );
}