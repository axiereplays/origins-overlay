export interface IAxieFigtherCards {
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

export interface IFigthersProps {
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