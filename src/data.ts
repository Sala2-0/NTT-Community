import { defineStore } from "pinia";
import { ref } from "vue";

type Member = {
    id: string;
    username: string;
    role: string;
    private_account: boolean;
    battles?: number;
    winrate?: number;
    xp_per_battle?: number;
    damage_per_battle?: number;
    kills_per_battle?: number;
}

type Members = {
    NTT: Member[];
    N7T: Member[];
    N77: Member[];
    NT7: Member[];
    [ key: string ]: Member[]
};

type ClanWar = {
    league: number;
     division: number;
     rating: number;
     tag: string;
     name: string;
};

type Clan = {
    NTT: ClanWar;
    N7T: ClanWar;
    N77: ClanWar;
    NT7: ClanWar;
}

type Data = {
    clan_wars: Clan | null;
    community_clans: Members | null;
    season_number: number | null;
};

type Ships = {
    [ key: string ]: {
        name: string;
        stats: {
          average_damage_dealt: number,
          average_kills: number,
          win_rate: number
        }
    }
};

export const API_DATA = defineStore("data", () => {
    const DATA = ref<Data>({
        community_clans: null,
        clan_wars: null,
        season_number: null
    });

    const SHIPS = ref<Ships>({

    });

    return {
        DATA,
        SHIPS
    }
});