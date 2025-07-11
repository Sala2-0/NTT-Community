import { defineStore } from "pinia";
import { ref } from "vue";
import type { Member } from "./types/member.ts";
import type { Ship } from "./types/ships.ts";
import type { PopularShip } from "./types/popularships.ts";

export const ApiData = defineStore("data", () => {
    const members = ref<{ [ key: string ]: Member[] }>({
        NTT: [],
        N7T: [],
        N77: [],
        NT7: [],
    });

    const ships = ref<Ship[]>([]);

    const popularShips = ref<PopularShip[] | null>([]);
    const nextUpdate = ref<number>(0);
    const lastResetDate = ref<string>("");

    return {
        members,
        ships,
        popularShips,
        nextUpdate,
        lastResetDate,
    }
});