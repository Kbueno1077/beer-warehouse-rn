import { has } from "./../node_modules/react-native-reanimated/src/createAnimatedComponent/utils";
import { BeerType } from "@/util/types";
import { create } from "zustand";

type FiltersType = {
    name: string;
};

export interface BeerState {
    beers: BeerType[];
    filteredBeers: BeerType[];
    hasFilters: boolean;

    applyFilters: (filters: FiltersType) => void;
    clearFilters: () => void;
    setBeers: (beers: BeerType[]) => void;
}

const useBeerStore = create<BeerState>()((set) => ({
    beers: [],
    filteredBeers: [],
    hasFilters: false,

    applyFilters: (filters) => {
        set((state) => {
            let filteredBeers: BeerType[] = [];

            if (filters.name !== "") {
                filteredBeers = state.beers.filter((beer: BeerType) => {
                    if (beer && beer.name)
                        return beer?.name.includes(filters?.name);
                    else return false;
                });
            }

            return { hasFilters: true, filteredBeers };
        });
    },

    clearFilters: () => {
        set({ hasFilters: false });
    },

    setBeers: (beers: BeerType[]) => {
        set({ beers });
    },
}));

export default useBeerStore;
