import { PlacedSticker } from '../types/manifest';

export interface HistoryState {
  past: PlacedSticker[][];
  present: PlacedSticker[];
  future: PlacedSticker[][];
}

const MAX_HISTORY = 40;

export function createHistory(initial: PlacedSticker[]): HistoryState {
  return {
    past: [],
    present: initial,
    future: [],
  };
}

export function recordAction(history: HistoryState, nextPresent: PlacedSticker[]): HistoryState {
  return {
    past: [...history.past.slice(-MAX_HISTORY), history.present],
    present: nextPresent,
    future: [],
  };
}

export function undo(history: HistoryState): { newHistory: HistoryState; stickers: PlacedSticker[] } | null {
  if (history.past.length === 0) return null;
  const previous = history.past[history.past.length - 1];
  const newPast = history.past.slice(0, history.past.length - 1);
  return {
    newHistory: {
      past: newPast,
      present: previous,
      future: [history.present, ...history.future],
    },
    stickers: previous,
  };
}

export function redo(history: HistoryState): { newHistory: HistoryState; stickers: PlacedSticker[] } | null {
  if (history.future.length === 0) return null;
  const next = history.future[0];
  const newFuture = history.future.slice(1);
  return {
    newHistory: {
      past: [...history.past, history.present],
      present: next,
      future: newFuture,
    },
    stickers: next,
  };
}
