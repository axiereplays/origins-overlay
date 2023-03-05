import { GetServerSideProps } from 'next';
import BattleComponent from '../../components/Battle/Battle';
import getBattle from '../../lib/getBattles';
import { IBattleData } from '../../components/Battle/interfaces';

export default function BattleIdPage(props: { battle: IBattleData | null }) {
  return (<BattleComponent battle={props.battle} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the battle by bid from the db
  const bid = context.query.bid;
  if (typeof bid === 'string') {
    return getBattle(bid);
  }

  throw new Error('invalid bid');
}
