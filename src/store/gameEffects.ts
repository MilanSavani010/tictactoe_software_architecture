import { useEffect } from 'react';
import { useGameActions } from './gameStore';
import { api } from '../services/api';

export function useGameEffects() {
  const { setGame } = useGameActions();

  useEffect(() => {
    const unsubscribe = api.subscribeToGameState(setGame);
    return unsubscribe;
  }, [setGame]);
}