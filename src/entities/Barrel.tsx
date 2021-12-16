import React, { useRef } from 'react';
import useGame from '../@core/useGame';
import { SpellCastingBeginEvent } from '../scenes/SpellCastingGameScene';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';

interface BarrelScriptProps {
    isForSpell: boolean;
}
type BarrelProps = GameObjectProps & BarrelScriptProps;

function BarrelScript({ isForSpell }: BarrelScriptProps) {
    const { getComponent } = useGameObject();
    const workState = useRef(false);
    const { publish } = useGame();

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        if (isForSpell) {
            publish<SpellCastingBeginEvent>('spell-casting-begin', 'geminio');
        }
    });

    return null;
}

export default function Barrel({ x, y, isForSpell, ...props }: BarrelProps) {
    return (
        <GameObject x={x} y={y} {...props}>
            <Sprite {...spriteData.objects} state="barrel" />
            <Collider />
            <Interactable />
            <BarrelScript isForSpell={isForSpell} />
        </GameObject>
    );
}
