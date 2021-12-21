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
import { dialogs } from '../dialogs/hogwarts';

function SwordScript() {
    const { openDialog } = useGame();

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        openDialog(dialogs.sword);
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
