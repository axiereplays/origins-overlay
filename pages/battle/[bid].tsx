import { IGetBattleData } from '@/lib/interfaces';
import { GetServerSideProps } from 'next';
import BattleComponent from '@/components/Battle/Battle';
import getBattle from '@/lib/getBattles';

export default function BattleIdPage(props: { battle: IGetBattleData | null }) {
  return (<BattleComponent battle={props.battle} />);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the battle by bid from the db
  const bid = context.query.bid;
  if (typeof bid === 'string' && bid.length > 0) {
    const battle = await getBattle(bid);
    return {
      props: {
        ...battle
      },
    }
  }

  throw new Error('invalid bid');
}
