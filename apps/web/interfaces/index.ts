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

export interface IGetBattleData {
  battle_uuid: string;
  user_id: string;
  client_ids: string[];
  team_ids: string;
  created_at: string;
  winner: number;
  battle_type: number;
  battle_type_string: string;
  first_client_fighters: string;
  second_client_fighters: string;
  rewards: string;
  delta_rewards: string;
  user_ranks: string;
  started_time: string;
  ended_time: string;
  old_mmr: number;
  new_mmr: number;
  replay_url: string;
  replayed: boolean;
  replayed_at: string;
}