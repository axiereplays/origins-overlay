import * as React from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import runesData from './runes.json';
import charmsData from './charms.json';
import cardsData from './cards.json';
import styles from './Cardset.module.css';
import { IAxieFighter } from '@/lib/interfaces';
import { Fighter } from '@/../skymavis_apis';

export const Cardset = (props: { fighters: Fighter[] }) => {
  const [fighters, setFighters] = React.useState<IAxieFighter[]>([]);

  useEffect(() => {
    // an array of 3 fighters alias axies
    const fighters = props.fighters.map((fighter) => {

      const runesItems = runesData['_items'];
      const cardsItems = cardsData['_items'];
      const charmsItems = charmsData['_items'];
      const { gene, charms } = fighter;

      const cards: IAxieFighter['cards'] = Object.keys(charms).map((part) => {
        const partValue = gene[part as keyof typeof charms]?.split('-')[1] ?? 'unknown';
        const partClass = gene[part as keyof typeof charms]?.split('-')[0] ?? 'unknown';
        // console.log(partClass)

        const card = cardsItems.find(
          (card) =>
            card.partValue === Number(partValue) &&
            card.partClass.toLocaleLowerCase() === partClass &&
            card.partType.toLocaleLowerCase() === part
        );

        if (card === undefined) {
          console.log(`Card not found for ${partClass} ${part} ${partValue}`);
        }

        const charmIndex = charmsItems.findIndex(
          (charm) => charm.item.id === charms[part as keyof typeof charms]
        )

        return {
          partId: partValue,
          charm: charmsItems[charmIndex]?.item.imageUrl || null,
          name: card?.name || `${partClass} ${part}`,
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
      })

      const rune = runesItems.find((rune) => rune.item.id === fighter.runes[0])?.item.imageUrl || null

      return {
        ...fighter,
        cards,
        rune,
      }
    });

    setFighters(fighters);
  }, [props.fighters, setFighters]);

  return (
    <div className={styles.cardset} >
      {fighters.length > 0 &&
        fighters.map((fighter, index) => {
          // check for starter axies, if found, skip
          if (fighter.axie_id < 15) {
            return null;
          }

          return (
            <div
              className={styles.cardset__container}
              style={{ zIndex: index + 1 }}
              key={`fighter-${index}`}
            >
              <div className={styles.cardset__fighter}>
                {/* Axie ID */}
                <span>#{fighter.axie_id}</span>

                {/* Axie Class */}
                <Image
                  src={`https://cdn.axieinfinity.com/marketplace-website/asset-icon/class/${fighter.gene['body-class']}.png`}
                  width={20}
                  height={20}
                  alt={fighter.gene['body-class'] ?? 'unknown'}
                />

                {/* Axie Rune */}
                {fighter.rune && (<Image src={fighter.rune} width={20} height={20} alt={'rune'} />)}
              </div>
              <div className={styles.cardset__cards}              >
                {fighter.cards.map((card, cardIndex) => {
                  // check for unknown cards, if found, skip
                  if (card.name.includes('unknown')) {
                    return null;
                  }

                  // TODO: fix japan, summer, xmas cards and genes
                  if (card.name.includes('japan') || card.name.includes('summer') || card.name.includes('xmas')) {
                    return null;
                  }

                  return (
                    <div
                      className={styles.cardset__card}
                      style={{ zIndex: cardIndex + 1 }}
                      key={`fighter-${index}-card-${cardIndex}`}
                    >
                      {/* card image background */}
                      <Image
                        alt={`${card.class}-${card.part}-${card.partId}`}
                        src={`https://cdn.axieinfinity.com/game/origin-cards/base/origin-cards-20230111/${card.class}-${card.part}-${card.partId}-00.png`}
                        width={200}
                        height={310}
                        style={{
                          marginTop: '-1px',
                        }}
                      />

                      {/* card name */}
                      <span className={styles.cardset__card__name}>{card.name}</span>

                      {/* card charm */}
                      {card.charm && (
                        <Image
                          className={styles.cardset__card__charm}
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
