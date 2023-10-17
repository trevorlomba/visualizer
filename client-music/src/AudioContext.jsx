import { Howler } from 'howler';
import Tuna from 'tunajs';
export const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
export const tuna = new Tuna(audioCtx);

export function initializeHowlerWithAudioContext() {
    // Check if Howler is ready and masterGain exists
    if (Howler && Howler.masterGain) {
        Howler.ctx = audioCtx;
        Howler.masterGain.connect(audioCtx.destination);
    }
}
