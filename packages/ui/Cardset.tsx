import * as React from 'react';
import { AxieMixer } from '@axieinfinity/mixer';
import Image from 'next/image';
import { useEffect } from 'react';
// import { getClassColor } from './utils';
import runesData from './runes.json';
import charmsData from './charms.json';
import cardsData from './cards.json';

interface IAxieFigtherCards {
  axie_id: number;
  combo: Map<string, string>;
  rune: string | null;
  cards: {
    partId: string;
    charm: string | null;
    name: string;
    part: string;
    class: string;
  }[];
}[]

interface IFigthersProps {
  gene: string;
  axie_id: number;
  axie_type: string;
  runes: string[];
  charms: {
    eyes: string;
    mouth: string;
    ears: string;
    horn: string;
    back: string;
    tail: string;
  };
}

export const Cardset = (props: { fighters: IFigthersProps[] }) => {
  const [fighters, setFighters] = React.useState<IAxieFigtherCards[]>([]);
  useEffect(() => {
    // an array of 3 fighters / axies
    const fighters = props.fighters.map((fighter) => {
      const axieGene512 = fighter.gene;
      const mixer = new AxieMixer(axieGene512, undefined, true);
      const combo = mixer.adultCombo;
      // Map(10) {'body' => 'body-fuzzy', 'body-class' => 'beast', 'back' => 'beast-02', 'ears' => 'beast-12', 'ear' => 'beast-12', …}
      // console.log(combo?.get('eyes'))

      const runes = runesData['_items'];
      const cards = cardsData['_items'];
      const charms = charmsData['_items'];

      return {
        axie_id: fighter.axie_id,
        combo,
        rune: `${runes.find((rune) => rune.item.id === fighter.runes[0])?.item.imageUrl
          }` || null,
        cards: Object.keys(fighter.charms).map((part) => {
          const partValue = combo.get(part)?.split('-')[1] ?? '';
          const partClass = combo.get(part)?.split('-')[0] ?? '';
          // console.log(partClass)

          const card = cards.find(
            (card) =>
              card.partValue === Number(partValue) &&
              card.partClass.toLocaleLowerCase() === partClass &&
              card.partType.toLocaleLowerCase() === part
          );

          if (card === undefined) {
            throw new Error(
              `Card not found for ${partClass} ${part} ${partValue}`
            );
          }

          const charmIndex = charms.findIndex(
            (charm) => charm.item.id === fighter.charms[part as keyof typeof fighter.charms]
          )

          return {
            partId: partValue,
            charm: charms[charmIndex]?.item.imageUrl || null,
            name: card.name,
            part: part,
            class: partClass,
            // description: card.description,
            // energy: card.energy,
            // attack: card.attack,
            // defense: card.defense,
            // healing: card.healing,
            // abilityType: card.abilityType,
            // level: card.level,
            // tags: card.tags,
          };
        }),
      };
    });
    setFighters(fighters);
  }, [props.fighters, setFighters]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // background: 'black',
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      {fighters.length > 0 &&
        fighters.map((fighter, index) => {
          return (
            <div
              style={{
                // TODO: background by axie type
                // background: 'aqua',
                paddingBottom: '25px',
                // paddingTop: '20px',
                width: '100%',
                height: '33.34%',
                position: 'relative',
                zIndex: index + 1,
                // marginTop: '-20px',
                boxSizing: 'border-box',
              }}
              key={`fighter-${index}`}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  margin: '0px',
                  width: '163px',
                  background: 'rgba(244, 239, 215, 0.8)',
                  paddingBottom: '30px',
                  paddingRight: '8px',
                  boxSizing: 'border-box',
                  fontSize: '0.9rem',
                  textAlign: 'right',
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingLeft: '25px',
                  // height: '60px',
                  paddingTop: '2px',
                  alignItems: 'center',
                }}
              >
                {/* Axie ID */}
                <span
                  style={{
                    lineHeight: '1',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#000',
                  }}
                >
                  #{fighter.axie_id}
                </span>

                {/* Class */}
                <Image
                  src={`https://cdn.axieinfinity.com/marketplace-website/asset-icon/class/${fighter.combo.get(
                    'body-class'
                  )}.png`}
                  width={20}
                  height={20}
                  alt={fighter.combo.get('body-class') ?? ''}
                />

                {/* Rune */}
                {fighter.rune && (<Image src={fighter.rune} width={20} height={20} alt={'rune'} />)}
              </div>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                }}
              >
                {fighter.cards.map((card, key) => {
                  return (
                    <div
                      style={{
                        // background: 'blue',
                        // opacity: 0.5,
                        width: '100%',
                        overflow: 'visible',
                        height: '16.67%',
                        position: 'relative',
                        zIndex: key,
                        // background: `url(https://cdn.axieinfinity.com/game/origin-cards/base/origin-cards-20230111/reptile-eyes-08.png) no-repeat scroll 0 0 transparent`,
                        // backgroundSize: '200px 310px'
                      }}
                      key={`fighter-${index}-card-${key}`}
                    >
                      {/* todo: move to background */}
                      <Image
                        alt={`${card.class}-${card.part}-${card.partId}`}
                        src={`https://cdn.axieinfinity.com/game/origin-cards/base/origin-cards-20230111/${card.class}-${card.part}-${card.partId}-00.png`}
                        width={200}
                        height={310}
                        style={{
                          // width: '100%',
                          // height: 'auto',
                          marginTop: '-1px',
                        }}
                      />

                      {/* card name */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '45px',
                          left: '60px',
                          margin: '0px',
                          // width: '100%',
                          display: 'block',
                          // paddingRight: '30px',
                          paddingTop: '10px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          lineHeight: '1',
                          padding: '4px 4px',
                          color: '#000',
                          background: 'rgba(244, 239, 215, 0.8)',
                          borderRadius: '15px',
                          // overflow: 'hidden',
                        }}
                      >
                        {card.name}
                      </span>

                      {/* charm */}
                      {card.charm && (
                        <Image
                          style={{
                            position: 'absolute',
                            top: '41px',
                            right: '8px',
                          }}
                          src={card.charm}
                          width={30}
                          height={30}
                          alt={'charm'}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};
