import { GetServerSideProps } from 'next';
import BattleOverlay from '../components/Battle/Battle';
import getBattle from '../lib/getBattles';
import { IBattleData } from '../components/Battle/interfaces';

export default function Page(props: { battle: IBattleData | null }) {
  return (<BattleOverlay battle={props.battle} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the battle that is being replayed
  return getBattle();
}
