export type Member = {
    _id: number;
    name: string;
    role: string;
    resided_clan: string;
    private_account?: boolean | undefined;
    battles?: number  | undefined;
    winrate?: number | undefined;
    xp_per_battle?: number | undefined;
    damage_per_battle?: number | undefined;
    kills_per_battle?: number | undefined;
    time_in_clan?: number | undefined;
    last_battle_time?: number | undefined;
}