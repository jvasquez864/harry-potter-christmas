import React, { useRef } from 'react';
import Collider from '../@core/Collider';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite, { SpriteRef } from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';

function ZombiePlantScript() {
    const { getComponent } = useGameObject();
    const plant = useRef(false);

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        plant.current = !plant.current;

        if (plant.current) {
            getComponent<SpriteRef>('Sprite').setState('zombie-plant-2');
        } else {
            getComponent<SpriteRef>('Sprite').setState('zombie-plant-1');
        }

        return waitForMs(400);
    });

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
            <ZombiePlantScript />
        </GameObject>
    );
}
