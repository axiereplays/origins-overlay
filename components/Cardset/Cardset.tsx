import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Cardset.module.css';
import runesData from './runes.json';
import charmsData from './charms.json';
import cardsData from './cards.json';
import { Fighter } from '@/lib/getUserBattleData';
import { AxieBodyStructure, getAxieBodyStructure512 } from '@axieinfinity/mixer';

const ORIGINS_CARDS_BASE_URL = 'https://cdn.axieinfinity.com/game/origin-cards/base/origin-cards-20230726';
export interface ICard {
  name: string | undefined;
  charm: string | null;
  partValue: string;
  partName: string;
  partClass: string;
}

export interface IAxieFighter extends Omit<Fighter, 'runes' | 'gene'> {
  body: AxieBodyStructure;
  rune: string | null;
  cards: ICard[];
}[]

export const Cardset = (props: { fighters: Fighter[] }) => {
  const [fighters, setFighters] = useState<IAxieFighter[]>([]);

  useEffect(() => {
    async function parseAxieFighter() {
      // an array of 3 fighters/axies
      let fighters: IAxieFighter[] = [];

      // loop through the fighters
      for (let i = 0; i < props.fighters.length; i++) {

        const runesItems = runesData['_items'];
        const cardsItems = cardsData['_items'];
        const charmsItems = charmsData['_items'];
        const fighter = props.fighters[i];
        const { gene, charms } = fighter;
        // parse the fighter body from gene
        const body = getAxieBodyStructure512(gene);

        // loop through the body parts, and find the card for each part
        const cards: IAxieFighter['cards'] = Object.keys(body.parts).map((partName) => {
          const part = body.parts[partName as keyof typeof body.parts];
          console.log(part)
          // value should be 2 digits
          const partValue = part.groups[0].value < 10 ? `0${part.groups[0].value}` : part.groups[0].value.toString();
          const partClass = part.groups[0].class.toLocaleLowerCase() || 'unknown';

          const card = cardsItems.find(
            (card) =>
              card.partValue === Number(partValue) &&
              card.partClass.toLocaleLowerCase() === partClass &&
              card.partType.toLocaleLowerCase() === partName.toLocaleLowerCase()
          );

          if (card === undefined) {
            console.log(`Card not found for ${partClass} ${part} ${partValue}`);
          }

          const charmIndex = charmsItems.findIndex(
            (charm) => charm.item.id === charms[partName.toLocaleLowerCase() as keyof typeof charms]
          )

          return {
            name: card?.name,
            charm: charmsItems[charmIndex]?.item.imageUrl || null,
            partName: partName.toLocaleLowerCase(),
            partValue: partValue,
            partClass: partClass,
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

        fighters.push({
          ...fighter,
          body,
          cards,
          rune,
        })
      }

      setFighters(fighters);
    }

    parseAxieFighter();

  }, []);

  return (
    <div className={styles.cardset} >
      {fighters.length > 0 && fighters.map((fighter, index) => {
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
                src={`https://cdn.axieinfinity.com/marketplace-website/asset-icon/class/${fighter.body.class.toLocaleLowerCase() || 'unknown'}.png`}
                width={20}
                height={20}
                alt={fighter.body.class || 'unknown'}
              />

              {/* Axie Rune */}
              {fighter.rune && (<Image src={fighter.rune} width={20} height={20} alt={'rune'} />)}
            </div>
            <div className={styles.cardset__cards}              >
              {fighter.cards && fighter.cards.map((card, cardIndex) => {
                return (
                  <div
                    className={styles.cardset__card}
                    style={{ zIndex: cardIndex + 1 }}
                    key={`fighter-${index}-card-${cardIndex}`}
                  >
                    {/* Card image background */}
                    <Image
                      alt={`${card.partClass}-${card.partName}-${card.partValue}`}
                      src={`${ORIGINS_CARDS_BASE_URL}/${card.partClass}-${card.partName}-${card.partValue}-00.png`}
                      width={200}
                      height={310}
                      style={{
                        marginTop: '-1px',
                      }}
                    />

                    {/* Card name */}
                    <span className={styles.cardset__card__name}>{card.name}</span>

                    {/* Card charm */}
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
