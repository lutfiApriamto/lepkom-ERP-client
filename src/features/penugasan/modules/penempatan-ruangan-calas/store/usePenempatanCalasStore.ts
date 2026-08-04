import { create } from 'zustand';
import type { RoomPlacement } from '../api/penempatanCalas.api';

interface PenempatanCalasState {
  selectedRoomPlacement: RoomPlacement | null;
  setSelectedRoomPlacement: (placement: RoomPlacement | null) => void;
}

export const usePenempatanCalasStore = create<PenempatanCalasState>((set) => ({
  selectedRoomPlacement: null,
  setSelectedRoomPlacement: (placement) => set({ selectedRoomPlacement: placement }),
}));
