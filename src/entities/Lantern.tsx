import React, { useRef } from 'react';
import useGame from '../@core/useGame';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';
import { SpellCastingBeginEvent } from '../scenes/SpellCastingGameScene';

function LanternScript() {
    const { getComponent } = useGameObject();
    const { publish } = useGame();
    const workState = useRef(false);

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        publish<SpellCastingBeginEvent>('spell-casting-begin', 'patronum');
    });

    return null;
}

export default function Lantern({ x, y, ...props }: GameObjectProps) {
    return (
        <GameObject x={x} y={y} {...props} layer="ground-decal">
            <Sprite {...spriteData.objects} state="lantern" />
            <Collider />
            <Interactable />
            <LanternScript />
        </GameObject>
    );
}
