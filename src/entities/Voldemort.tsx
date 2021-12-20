import React from 'react';
import DialogScript from '../components/DialogScript';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import Moveable from '../@core/Moveable';
import Sprite from '../@core/Sprite';
import CameraFollowScript from '../components/CameraFollowScript';
import CharacterScript from '../components/CharacterScript';
import PlayerScript from '../components/PlayerScript';
import spriteData from '../spriteData';
import HostileNPCScript from '../components/HostileNPCScript';
import HostileNPC from './HostileNPC';

interface VoldemortProps extends GameObjectProps {
    onAttacked?: () => void;
    onShot: () => void;
    patrol?: boolean;
}
export default function Voldemort(props: VoldemortProps) {
    return <HostileNPC name="voldemort-player" {...props} />;
}
