import React, { useCallback, useEffect, useState } from 'react';
import useGame from '../@core/useGame';
import { dialogs } from '../dialogs/spellcasting';
import * as THREE from 'three';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import TileMap from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import resolveMapTile from '../tile-resolvers/hogwarts';
import useGameEvent from '../@core/useGameEvent';
import { SceneReadyEvent } from '../@core/Scene';
import MemoryMatchOverlay from '../@core/MemoryMatchOverlay';
import useSceneManager from '../@core/useSceneManager';
import { PubSubEvent } from '../@core/utils/createPubSub';
import SpellcastingOverlay from '../@core/SpellcastingOverlay';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
| | | | | | | | | | | | | | | | |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 X 0 0 0 0 T 0 0 0 B 0 0 0 1
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 |
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`);

export type SpellCastingBeginEvent = PubSubEvent<'spell-casting-begin', string>;
export default function SpellCastingGameScene() {
    const { openDialog, setGameState } = useGame();
    const { setScene } = useSceneManager();
    const [isMiniGameStarted, setIsMiniGameStarted] = useState(false);

    const onGameEnd = useCallback(
        (didWin: boolean) => {
            setIsMiniGameStarted(false);
            setGameState('spellcastingWin', didWin);
            setScene('hogwarts');
        },
        [setGameState, setScene]
    );

    useGameEvent<SpellCastingBeginEvent>('spell-casting-begin', spellName => {
        const dialog = dialogs[`learn-${spellName}`];
        openDialog({ ...dialog, onClose: () => setIsMiniGameStarted(true) });
    });

    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>

            <GameObject x={8} y={0}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="start"
                    enterDirection={[0, 1]}
                    target="hogwarts/spellcastingEnter"
                />
            </GameObject>

            <Player canWalk={!isMiniGameStarted} x={2} y={5} />
            <SpellcastingOverlay isOpen={isMiniGameStarted} />
        </>
    );
}
