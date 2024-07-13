import { create } from 'zustand';

const useStore = create((set) => ({
  navigatorClick: 'default',
  setNavigatorClick: (state) => set({ navigatorClick: state }),
}));

export default useStore;
