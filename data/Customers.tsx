import { atom } from "jotai";

const customerDataAtom = atom<string[][]>([
    ["Existent", "Existential"],
    ["Midranger", "Punker"],
    ["Eternal", "Indivision"]
]);

export default customerDataAtom;