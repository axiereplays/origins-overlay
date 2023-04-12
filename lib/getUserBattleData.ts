
export interface BattleLogResponse {
  battle_uuid: string
  client_ids: string[]
  team_ids: number[]
  created_at: number
  winner: number
  battle_type: number
  battle_type_string: string
  first_client_fighters: Fighter[];
  second_client_fighters: Fighter[];
  rewards: Reward[]
  delta_rewards: DeltaReward[]
  user_ranks: UserRank[]
  started_time: number
  ended_time: number
  old_mmr: number
  new_mmr: number
  replay_url: string
}

export interface Fighter {
  gene: string;
  axie_id: number;
  axie_type: string;
  runes: string[];
  charms: Charms;
  position: number;
}

export interface Charms {
  eyes: string
  mouth: string
  ears: string
  horn: string
  back: string
  tail: string
}

interface Reward {
  user_id: string
  new_vstar: number
  old_vstar: number
  result: string
  items: Item[]
}

interface Item {
  item_id: string
  quantity: number
}

interface DeltaReward {
  user_id: string
  new_vstar: number
  old_vstar: number
  result: string
  items: Item[]
}

interface UserRank {
  division: string
  tier: number
}

export async function fetchUserBattleLog(
  userID: string,
  limit = 100,
  page = 1,
  withAPIKey?: string
) {
  try {
    const response = await fetch(
      `https://api-gateway.skymavis.com/x/origin/battle-history?type=pvp&client_id=${userID}&limit=${limit}&page=${page}}`,
      {
        headers: {
          'X-API-Key': withAPIKey || process.env.SKYMAVIS_API_KEY!,
          accept: 'application/json'
        }
      }
    )

    const data = await response.json()
    return data["battles"] as BattleLogResponse[]
  }
  catch (error) {
    console.error(error)
    return null;
  }
}

// get the battle data from the API, return it parsed as props for the BattleComponent
export default async function getUserBattleData(battleId: string, userId: string): Promise<BattleLogResponse | null> {
  console.log(`Getting battle ${battleId}`);

  // get user battles from the skymavis api, iterate over it until we find the battle we want with the given battleId
  let page = 1;
  let battleLog = await fetchUserBattleLog(userId, 100, page, process.env.NEXT_PUBLIC_SKYMAVIS_API_KEY);
  if (!battleLog) {
    console.log(`Battle ${battleId} not found`);
    return null;
  }

  let battleData = battleLog.find((battle) => battle.battle_uuid === battleId);
  while (!battleData && battleLog.length > 0) {
    page++;
    battleLog = await fetchUserBattleLog(userId, 100, page, process.env.NEXT_PUBLIC_SKYMAVIS_API_KEY);
    if (!battleLog) {
      console.log(`Battle ${battleId} not found`);
      return null;
    }

    battleData = battleLog.find((battle) => battle.battle_uuid === battleId);
  }

  // if we didn't find the battle, return null
  if (!battleData) {
    console.log(`Battle ${battleId} not found`);
    return null;
  }

  // re order fighters, so the first player is always on the left side
  const first_client_fighters = battleData.client_ids[0] === userId ? battleData.first_client_fighters : battleData.second_client_fighters;
  const second_client_fighters = battleData.client_ids[0] === userId ? battleData.second_client_fighters : battleData.first_client_fighters;

  return {
    ...battleData,
    first_client_fighters: first_client_fighters,
    second_client_fighters: second_client_fighters,
  }

}