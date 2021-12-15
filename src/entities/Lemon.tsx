import React, { useEffect, useRef, useState } from 'react';
import useGame from '../@core/useGame';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';

const itemName = 'gate-1-key';
function LemonScript() {
    const { openDialog } = useGame();
    const [hasCollectedLemons, setHasCollectedLemons] = useState(false);
    const playSfx = useSound(soundData.eating);
    const dialog = hasCollectedLemons
        ? ['When life gives you lemons, make lemonade.']
        : [
              'The lemons have a delightfully strong smell. Wait.  What is that?',
              'You lean in closer and pick up a key.\n "This might come in handy later."',
          ];
    useGameObjectEvent<InteractionEvent>('interaction', other => {
        openDialog({
            character: 'harry',
            dialog,
            onClose: () => {
                playSfx();
            },
        });

        if (!other.inventory.includes(itemName)) {
            other.updateInventory([...other.inventory, itemName]);
            setHasCollectedLemons(true);
        }
    });

    // useGameObjectEvent<TriggerEvent>('trigger', other => {
    //     if (other.name === 'player') {
    //         getRef().setDisabled(true);
    //         playSfx();
    //     }
    // });

    return null;
}

export default function Lemon(props: GameObjectProps) {
    return (
        <GameObject {...props}>
            <Sprite {...spriteData.objects} state="lemon" />
            <Collider />
            <Interactable />
            <LemonScript />
        </GameObject>
    );
}
