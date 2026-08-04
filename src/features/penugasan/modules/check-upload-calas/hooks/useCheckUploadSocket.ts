import { useEffect } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { UPLOAD_KEYS } from '../api/checkUpload.api';

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const useCheckUploadSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('[Socket.IO] Connected to backend realtime server');
    });

    socket.on('new-jawaban-upload', (payload: {
      namaCalas: string;
      npm: string;
      jenisUjian: string;
      ruangan: number | null;
      timestamp: string;
    }) => {
      // Trigger a toaster notification
      toast.success(
        `Calas ${payload.namaCalas} (${payload.npm}) telah mengunggah jawaban ${payload.jenisUjian}!`,
        { duration: 5000, position: 'top-right' }
      );

      // Invalidate the query to fetch the latest data for the table
      queryClient.invalidateQueries({ queryKey: UPLOAD_KEYS.lists() });
    });

    socket.on('disconnect', () => {
      console.log('[Socket.IO] Disconnected from backend');
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};
