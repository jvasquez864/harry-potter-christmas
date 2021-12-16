/*
stupefy - stuns target (Corpse)

expecto patronum - (light) The Patronus Charm is a powerful 
projection of hope and happiness that drives away Dementors; 
a corpeal Patronus takes the the respective animal form of 
the caster, while a non-corpeal appears as a wisp of light; 
at 13, Harry Potter was the youngest known witch or wizard 
to prouduce a corpeal Patronus

geminio - duplicates objects (barrel activates)
*/
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

function StumpScript() {
    const { getComponent } = useGameObject();
    const { publish } = useGame();
    const workState = useRef(false);

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        publish<SpellCastingBeginEvent>('spell-casting-begin', 'stupefy');
    });

    return null;
}

export default function Stump({ x, y, ...props }: GameObjectProps) {
    return (
        <GameObject x={x} y={y} {...props} layer="ground-decal">
            <Sprite {...spriteData.objects} state="stump" />
            <Collider />
            <Interactable />
            <StumpScript />
        </GameObject>
    );
}
