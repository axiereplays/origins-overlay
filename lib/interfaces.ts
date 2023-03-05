import { Fighter, Charms } from '../../skymavis_apis';

export interface IParsedGene extends Partial<Charms> {
  body?: string;
  'body-class'?: string;
}

export interface ICard {
  partId: string;
  charm: string | null;
  name: string;
  part: string;
  class: string;
}

export interface IAxieFighter extends Omit<Fighter, 'runes' | 'gene'> {
  gene: IParsedGene;
  rune: string | null;
  cards: ICard[];
}[]

export interface IGetBattleData {
  battle_uuid: string;
  user_id: string;
  client_ids: string[];
  team_ids: string;
  created_at: number;
  winner: number;
  battle_type: number;
  battle_type_string: string;
  first_client_fighters: Partial<Fighter>[];
  second_client_fighters: Partial<Fighter>[];
  rewards: string;
  delta_rewards: string;
  user_ranks: string;
  started_time: number;
  ended_time: number;
  old_mmr: number;
  new_mmr: number;
  replay_url: string;
  replayed: boolean;
  replayed_at: string;
}