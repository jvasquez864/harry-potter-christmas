import React from 'react';
import DialogScript from '../components/DialogScript';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Moveable from '../@core/Moveable';
import Sprite from '../@core/Sprite';
import CameraFollowScript from '../components/CameraFollowScript';
import CharacterScript from '../components/CharacterScript';
import PlayerScript from '../components/PlayerScript';
import spriteData from '../spriteData';
import HostileNPCScript from '../components/HostileNPCScript';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useGame from '../@core/useGame';
import { dialogs } from '../dialogs/hogwarts';
import useGameObject from '../@core/useGameObject';
import Attackable from '../@core/Attackable';

interface HostileNPCProps extends GameObjectProps {
    name: string;
    onAttacked: () => void;
    onShot: () => void;
    patrol?: boolean;
}
export default function HostileNPC({
    name,
    onAttacked,
    onShot,
    patrol,
    ...props
}: HostileNPCProps) {
    const spriteProps = spriteData[name];

    return (
        <GameObject name={name} displayName={name} layer="character" {...props}>
            <Moveable />
            <Attackable />
            <Interactable />
            <Collider />
            <CharacterScript>
                <Sprite {...spriteProps} />
            </CharacterScript>
            <HostileNPCScript patrol={patrol} onAttacked={onAttacked} onShot={onShot} />
            <DialogScript />
        </GameObject>
    );
}
