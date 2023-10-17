import { useEffect } from 'react';
import { audioCtx, tuna } from '../AudioContext'

function useTunaEffect(howlerSound) {
    audioCtx()
    
        if (howlerSound) {
            const chorus = new tuna.Chorus({
                rate: 1.5,
                feedback: 0.4,
                depth: 0.7,
                delay: 0.0045,
                bypass: false,
                gain: 0
            });

            console.log(`howlerSound', ${howlerSound}`)

            // Disconnect Howler's masterGain from destination and connect it to chorus
            howlerSound._sounds[0]._node.disconnect();
            howlerSound._sounds[0]._node.connect(chorus);

            // Connect chorus to destination
            chorus.connect(audioCtx.destination);
        }
    }

export default useTunaEffect;