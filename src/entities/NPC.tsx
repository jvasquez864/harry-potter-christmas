import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite from '../@core/Sprite';
import CharacterScript from '../components/CharacterScript';
import spriteData from '../spriteData';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGame from '../@core/useGame';
import { dialogs } from '../dialogs/npc';

function NPCScript({ name }) {
    const { openDialog } = useGame();

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        openDialog(dialogs[name]);
    });

    return null;
}

interface NPCProps extends GameObjectProps {
    name: string;
}

export default function NPC({ name, ...props }: NPCProps) {
    const spriteProps = spriteData[name];

    return (
        <GameObject name={name} displayName={name} layer="character" {...props}>
            <Interactable />
            <Collider />
            <CharacterScript>
                <Sprite {...spriteProps} />
            </CharacterScript>
            <NPCScript name={name} />
        </GameObject>
    );
}
