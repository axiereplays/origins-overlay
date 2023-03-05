import { GetServerSideProps } from 'next';
import BattleOverlay, { BattleProps } from '@/components/Battle/Battle';
import getBattle from '@/lib/getBattles';

export default function Page({ battle }: BattleProps) {
  return (<BattleOverlay battle={battle} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the battle that is being replayed
  const battle = await getBattle();
  return {
    props: {
      ...battle
    },
  }
}
