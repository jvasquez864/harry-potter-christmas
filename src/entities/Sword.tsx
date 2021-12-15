import React, { useRef } from 'react';
import useGame from '../@core/useGame';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
// import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';

function SwordScript() {
    const { openDialog } = useGame();

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        openDialog({
            character: 'harry',
            dialog: [
                'You hear a strange sound from this weapon.',
                'Perhaps there is something within the walls',
            ],
        });
    });

    return null;
}

export default function Sword(props: GameObjectProps) {
    return (
        <>
            <GameObject {...props} layer="ground-decal">
                <Sprite {...spriteData.objects} state="sword-2" />
                <Collider />
                <Interactable />
                <SwordScript />
            </GameObject>
        </>
    );
}
