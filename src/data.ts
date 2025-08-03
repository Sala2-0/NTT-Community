import { defineStore } from "pinia";
import { ref } from "vue";
import type { Member } from "./types/member.ts";
import type { Ship } from "./types/ships.ts";
import type { PopularShip } from "./types/popularships.ts";
import axios from "axios";

export const ApiData = defineStore("data", () => {
    const apiUrl: string = import.meta.env.DEV ? "http://localhost:3000" : "https://ntt-community.com";

    const members = ref<{ [ key: string ]: Member[] }>({
        NTT: [],
        N7T: [],
        N77: [],
        NT7: [],
    });

    const ships = ref<Ship[]>([]);

    const popularShips = ref<PopularShip[] | null>([]);
    const lastResetDate = ref<string>("");

    async function getPopularShipsData(reset?: boolean) {
        const res = await axios.get(`${apiUrl}/api/popular_ships`);
        popularShips.value = res.data.data.sort((a: PopularShip, b: PopularShip) => b.battles - a.battles);

        if (!reset)
            lastResetDate.value = res.data.last_reset_date;
    }

    return {
        apiUrl,
        members,
        ships,
        popularShips,
        lastResetDate,
        getPopularShipsData,
    }
});