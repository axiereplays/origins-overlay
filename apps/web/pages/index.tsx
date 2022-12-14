import { BattleTitle, Cardset } from 'ui';
import styles from './index.module.css';

const battle = {
  battle_uuid: '507c0e8e-25d3-4a05-a718-9dd77d4f61ac',
  client_ids: [
    '1ec9eb73-5f16-66bc-a60c-2ee170fbe517',
    '1ed5b7e8-07d9-6fe9-a00b-1b92a6ce7dc4',
  ],
  first_client_fighters: [
    {
      gene: '0x1800000000000100008040710408000000010000280080040001000028010002000100001800c50800010000300144020001000010004002000100000800400a',
      axie_id: 11548449,
      axie_type: 'ronin',
      runes: ['rune_plant_4001_s1_nft'],
      charms: {
        eyes: 'ecard_neutral_2001_s1',
        mouth: 'ecard_beast_2001_s1_nft',
        ears: 'ecard_neutral_5002_s1_nft',
        horn: '',
        back: '',
        tail: 'ecard_neutral_5003_s1_nft',
      },
    },
    {
      gene: '0x8000000000001000100a050820800000001000420204302000100002820410400010004088180040001000428a0410a000100042860c102000100040841410a',
      axie_id: 11576894,
      axie_type: 'ronin',
      runes: ['rune_bug_4001_s1_nft'],
      charms: {
        eyes: 'ecard_bug_3003_s1_nft',
        mouth: 'ecard_beast_2001_s1_nft',
        ears: 'ecard_bug_3003_s1_nft',
        horn: '',
        back: '',
        tail: 'ecard_bug_4001_s1_nft',
      },
    },
    {
      gene: '0x1000200e020830c0000000100002820820a0001000020810008000100043021810c000100000800450c0001000008004002000100082880410c',
      axie_id: 11576061,
      axie_type: 'ronin',
      runes: ['rune_beast_4001_s1_nft'],
      charms: {
        eyes: 'ecard_beast_4003_s1_nft',
        mouth: '',
        ears: 'ecard_neutral_2003_s1',
        horn: 'ecard_neutral_3007_s1_nft',
        back: 'ecard_neutral_1002',
        tail: 'ecard_bird_2002_s1_nft',
      },
    },
  ],
  second_client_fighters: [
    {
      gene: '0x10002004090c30800000001000010008004000100002820410a00010000180182040001000008004004000100000800420a0001000018004006',
      axie_id: 11564542,
      axie_type: 'ronin',
      runes: ['rune_beast_2001_s1_nft'],
      charms: {
        eyes: 'ecard_neutral_2001_s1',
        mouth: 'ecard_beast_3001_s1',
        ears: 'ecard_beast_2001_s1',
        horn: 'ecard_beast_2001_s1',
        back: 'ecard_neutral_3001_s1',
        tail: 'ecard_neutral_2001_s1',
      },
    },
    {
      gene: '0x10001c040708200000000010000280080040001000028014304000100001801800600010000084044080001000008004002000100000800c002',
      axie_id: 11565989,
      axie_type: 'ronin',
      runes: ['rune_neutral_1001_s1'],
      charms: {
        eyes: 'ecard_neutral_3003_s1',
        mouth: 'ecard_neutral_2001_s1',
        ears: 'ecard_neutral_1001_s1',
        horn: 'ecard_neutral_2002_s1',
        back: 'ecard_neutral_2002_s1',
        tail: 'ecard_neutral_3005_s1',
      },
    },
    {
      gene: '0x1000081c0208210000000010000100080040001000020004008000100003000850c000100001000450c000100000800400c000100001800c404',
      axie_id: 11523022,
      axie_type: 'ronin',
      runes: ['rune_beast_3001_s1'],
      charms: {
        eyes: 'ecard_neutral_2002_s1',
        mouth: '',
        ears: 'ecard_beast_3003_s1_nft',
        horn: 'ecard_neutral_2002_s1_nft',
        back: 'ecard_beast_3002_s1_nft',
        tail: 'ecard_beast_3003_s1_nft',
      },
    },
  ],
};

export default function Web() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 600,
          }}
        >
          <BattleTitle battleUUID={battle.battle_uuid} />
        </h2>
      </div>
      {/* <div className={styles.subheader}></div> */}
      <div className={styles.left}>
        <Cardset fighters={battle.first_client_fighters} />
      </div>
      <div className={styles.right}>
        <Cardset fighters={battle.second_client_fighters} />
      </div>
      {/* <div className={styles.center}></div> */}
      <div className={styles.footer}>
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas amet
          iure sint, exercitationem temporibus perspiciatis ipsam culpa quam
          voluptates iusto vel omnis pariatur quasi earum necessitatibus facere
          quae iste! Perspiciatis.
        </h3>
      </div>
    </div>
  );
}
