import { GetServerSideProps } from 'next';
import BattleComponent from '../../BattleComponent';
import getBattle from '../../getBattles';
import { IBattleData } from '../../interfaces';

export default function BattleIdPage(props: { battle: IBattleData | null }) {
  return (<BattleComponent battle={props.battle} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the battle by bid from the db
  const bid = context.query.bid as string;
  return getBattle(bid);
}
