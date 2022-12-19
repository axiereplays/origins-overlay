export interface IFighter {
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

export interface IBattleData {
  battle_uuid: string;
  client_ids: string[];
  first_client_fighters: IFighter[];
  second_client_fighters: IFighter[];
}