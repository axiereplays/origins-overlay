import * as React from 'react';
import { AxieMixer } from '@axieinfinity/mixer';
import Image from 'next/image';
import { useEffect } from 'react';

export const Cardset = (props: {
  fighters: {
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
  }[];
}) => {
  // parse genes
  // const axieGene512 = props.fighters[0].gene
  // const mixer = new AxieMixer(axieGene512, undefined, true)
  // const assets2 = mixer.getAvatarLayers()
  // console.log(props)

  useEffect(() => {
    for (let i = 0; i < props.fighters.length; i++) {
      const axieGene512 = props.fighters[i].gene;
      const mixer = new AxieMixer(axieGene512, undefined, true);
      const assets2 = mixer.getAvatarLayers();
      console.log(assets2);
    }
  }, [props.fighters]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'black',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {props.fighters.map((fighter, index) => {
          return (
            <div
              style={{
                background: 'aqua',
                opacity: 0.5,
                paddingBottom: '20px',
                width: '100%',
                // height: '33%',
              }}
              key={`fighter-${index}`}
            >
              {/* <h4>Axie #{fighter.axie_id}</h4> */}
              {Object.keys(fighter.charms).map((key) => {
                return (
                  <div
                    style={{
                      background: 'blue',
                      opacity: 0.5,
                      width: '100%',
                      overflow: 'hidden',
                      height: '20%',
                    }}
                    key={`fighter-${index}-card-${key}`}
                  >
                    <Image
                      alt="reptile"
                      src="https://cdn.axieinfinity.com/game/origin-cards/base/origin-cards-20220928/reptile-eyes-08.png"
                      width={456}
                      height={706}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
