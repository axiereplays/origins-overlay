import { GetServerSideProps } from 'next';
import BattleComponent from '../components/Battle/Battle';
import getBattle from '../components/Battle/getBattles';
import { IBattleData } from '../components/Battle/interfaces';

export default function BattlePage(props: { battle: IBattleData | null }) {
  return (<BattleComponent battle={props.battle} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the battle that is being replayed
  return getBattle();
}
