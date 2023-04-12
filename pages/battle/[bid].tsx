import { GetServerSideProps } from 'next';
import BattleComponent from '@/components/Battle/Battle';
import getUserBattleData, { BattleLogResponse } from '@/lib/getUserBattleData';

export default function BattleIdPage(props: { battle: BattleLogResponse | null }) {
  if (!props.battle) {
    return (<h2>Battle not found</h2>);
  }

  return (<BattleComponent battle={props.battle} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the battle by bid from the db
  const battleId = context.query.bid;
  const userId = context.query.userId;
  let battle = null;

  if (battleId && !Array.isArray(battleId) && battleId.length > 0 && userId && !Array.isArray(userId) && userId.length > 0) {
    battle = await getUserBattleData(battleId, userId);
  }

  return {
    props: {
      battle
    },
  }
}
