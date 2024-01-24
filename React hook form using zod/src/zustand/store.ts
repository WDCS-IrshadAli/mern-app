import { create } from "zustand";

type CounterStore = {
    count: number,
    inc: () => void,
    dec: () => void,
}

export const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    inc: () => { set((state) => ({ count: state.count + 1 }))},
    dec: () => { set((state) => ({ count: state.count - 1 }))}
}))