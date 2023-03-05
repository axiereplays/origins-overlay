import * as React from 'react';
import { AxieMixer } from '@axieinfinity/mixer';
import Image from 'next/image';
import { useEffect } from 'react';
import runesData from './runes.json';
import charmsData from './charms.json';
import cardsData from './cards.json';
import styles from './Cardset.module.css';
import { IAxieFigtherCards, IFigthersProps } from './interfaces';

export const Cardset = (props: { fighters: IFigthersProps[] }) => {
  const [fighters, setFighters] = React.useState<IAxieFigtherCards[]>([]);
  useEffect(() => {
    // an array of 3 fighters alias axies
    const fighters = props.fighters.map((fighter) => {
      // TODO: move to scrapper script
      const axieGene512 = fighter.gene;
      const mixer = new AxieMixer(axieGene512, undefined, true);
      const combo = mixer.adultCombo;
      console.log(combo);
      // Convert the Map object to a plain object
      var plainObject = Object.fromEntries(combo);

      // Convert the plain object to a JSON object
      var jsonObject = JSON.stringify(plainObject);
      console.log(jsonObject);
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
          const partValue = combo.get(part)?.split('-')[1] ?? 'unknown';
          const partClass = combo.get(part)?.split('-')[0] ?? 'unknown';
          // console.log(partClass)

          const card = cards.find(
            (card) =>
              card.partValue === Number(partValue) &&
              card.partClass.toLocaleLowerCase() === partClass &&
              card.partType.toLocaleLowerCase() === part
          );

          if (card === undefined) {
            console.log(`Card not found for ${partClass} ${part} ${partValue}`);
          }

          const charmIndex = charms.findIndex(
            (charm) => charm.item.id === fighter.charms[part as keyof typeof fighter.charms]
          )

          return {
            partId: partValue,
            charm: charms[charmIndex]?.item.imageUrl || null,
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
        }),
      };
    });
    setFighters(fighters);
  }, [props.fighters, setFighters]);

  return (
    <div className={styles.cardset} >
      {fighters.length > 0 &&
        fighters.map((fighter, index) => {
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
                  src={`https://cdn.axieinfinity.com/marketplace-website/asset-icon/class/${fighter.combo.get(
                    'body-class'
                  )}.png`}
                  width={20}
                  height={20}
                  alt={fighter.combo.get('body-class') ?? 'unknown'}
                />

                {/* Axie Rune */}
                {fighter.rune && (<Image src={fighter.rune} width={20} height={20} alt={'rune'} />)}
              </div>
              <div className={styles.cardset__cards}              >
                {fighter.cards.map((card, cardIndex) => {
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
