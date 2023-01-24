import { GetServerSideProps } from 'next';
import BattleComponent from '../BattleComponent';
import getBattle from '../getBattles';
import { IBattleData } from '../interfaces';

export default function BattlePage(props: { battle: IBattleData | null }) {
  return (<BattleComponent battle={props.battle} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the battle that is being replayed
  return getBattle();
}
