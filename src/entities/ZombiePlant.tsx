import React, { useEffect, useRef, useState } from 'react';
import Collider from '../@core/Collider';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite, { SpriteRef } from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import Moveable, { MoveableRef } from '../@core/Moveable';
import tileUtils from '../@core/utils/tileUtils';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';

function ZombiePlantScript() {
    const { getComponent, getRef, transform } = useGameObject();
    const [interactionCount, setInteractionCount] = useState(0);
    const playSfx = useSound(soundData.eating);
    const plant = useRef(false);

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        plant.current = !plant.current;

        if (plant.current) {
            getComponent<SpriteRef>('Sprite').setState('zombie-plant-2');
        } else {
            getComponent<SpriteRef>('Sprite').setState('zombie-plant-1');
        }

        setInteractionCount(prevInteractionCount => prevInteractionCount + 1);
        playSfx();

        return waitForMs(400);
    });

    useEffect(() => {
        if (interactionCount > 0) {
            const nextPosition = tileUtils(transform).add({ x: 1, y: 0 });
            getComponent<MoveableRef>('Moveable')?.move(nextPosition);
        }
        if (interactionCount >= 3) {
            getRef().setDisabled(true);
        }
    }, [interactionCount]);

    return null;
}

export default function ZombiePlant(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Interactable />
            <Sprite
                {...spriteData.objects}
                state="zombie-plant-1"
                offset={{ x: 0, y: 0.25 }}
            />
            <Moveable />
            <ZombiePlantScript />
        </GameObject>
    );
}
