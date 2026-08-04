import { create } from 'zustand';
import type { RoomPlacement } from '../api/penempatanAsisten.api';

interface PenempatanAsistenState {
  selectedRoomPlacement: RoomPlacement | null;
  setSelectedRoomPlacement: (placement: RoomPlacement | null) => void;
}

export const usePenempatanAsistenStore = create<PenempatanAsistenState>((set) => ({
  selectedRoomPlacement: null,
  setSelectedRoomPlacement: (placement) => set({ selectedRoomPlacement: placement }),
}));
