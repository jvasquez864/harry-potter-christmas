import React, { useRef } from 'react';
import useGame from '../@core/useGame';
import { dialogs } from '../dialogs/hogwarts';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';

function CrateScript() {
    const { getComponent } = useGameObject();
    const { openDialog } = useGame();
    const workState = useRef(false);
    useGameObjectEvent<InteractionEvent>('interaction', () => {
        openDialog(dialogs.crate);
    });

    return null;
}

export default function Crate(props: GameObjectProps) {
    return (
        <GameObject {...props}>
            <Sprite {...spriteData.objects} state="crate" />
            <Collider />
            <Interactable />
            <CrateScript />
        </GameObject>
    );
}
