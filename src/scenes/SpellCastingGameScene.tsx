import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
| 0 0 X 0 0 0 0 T 0 0 0 Bs0 0 0 1
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 |
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`);

export type SpellCastingBeginEvent = PubSubEvent<'spell-casting-begin', string>;
export default function SpellCastingGameScene() {
    const { openDialog, setGameState } = useGame();
    const { setScene, setSceneState, getSceneState } = useSceneManager();
    const [isStupefyStarted, setIsStupefyStarted] = useState(false);
    const [isPatronumStarted, setIsPatronumStarted] = useState(false);
    const [isGeminioStarted, setIsGeminioStarted] = useState(false);

    const toggleMiniGameState = useCallback((spellName: string, state: boolean) => {
        switch (spellName) {
            case 'stupefy':
                setIsStupefyStarted(state);
                break;
            case 'patronum':
                setIsPatronumStarted(state);
                break;
            case 'geminio':
                setIsGeminioStarted(state);
                break;
            default:
                break;
        }
    }, []);

    const isLevelComplete = useCallback(() => {
        const hasCompletedStupefy = getSceneState(`spellcasting-complete-stupefy`);
        const hasCompletedPatronum = getSceneState(`spellcasting-complete-patronum`);
        const hasCompletedGeminio = getSceneState(`spellcasting-complete-geminio`);
        return hasCompletedStupefy && hasCompletedPatronum && hasCompletedGeminio;
    }, [getSceneState]);

    const onGameEnd = useCallback(
        (didWin: boolean, spellName: string) => {
            toggleMiniGameState(spellName, false);
            const result = didWin ? 'win' : 'loss';

            const resultDialog = dialogs[`learn-${spellName}-${result}`];
            openDialog(resultDialog);

            didWin && setSceneState(`spellcasting-complete-${spellName}`, didWin);
            if (isLevelComplete()) {
                setGameState('level', 2);
                setGameState('didJustLose', false);
                setGameState('position', { x: 8, y: 14 });
                openDialog({
                    ...dialogs['level-complete'],
                    onClose: () => setScene('hogwarts/spellcastingEnter'),
                });
            }
        },
        [
            setGameState,
            setSceneState,
            setScene,
            openDialog,
            toggleMiniGameState,
            isLevelComplete,
        ]
    );

    const getSpellInteractionDialog = useCallback(
        (spellName: string) => {
            if (isLevelComplete()) {
                return { dialog: dialogs['play-again'], shouldPlay: true };
            }

            const hasCompleted = getSceneState(`spellcasting-complete-${spellName}`);
            if (hasCompleted) {
                return { dialog: dialogs['spell-already-complete'], shouldPlay: false };
            }

            const hasCompletedStupefy = getSceneState(`spellcasting-complete-stupefy`);
            const hasCompletedPatronum = getSceneState(`spellcasting-complete-patronum`);

            const learnSpellDialog = dialogs[`learn-${spellName}`];
            const notReadyDialog = dialogs['prerequisite-required'];
            switch (spellName) {
                case 'stupefy':
                    return { dialog: learnSpellDialog, shouldPlay: true };
                case 'patronum':
                    return hasCompletedStupefy
                        ? { dialog: learnSpellDialog, shouldPlay: true }
                        : { dialog: notReadyDialog, shouldPlay: false };
                case 'geminio':
                    return hasCompletedStupefy && hasCompletedPatronum
                        ? { dialog: learnSpellDialog, shouldPlay: true }
                        : { dialog: notReadyDialog, shouldPlay: false };
                default:
                    return { dialog: notReadyDialog, shouldPlay: false };
            }
        },
        [getSceneState]
    );
    useGameEvent<SpellCastingBeginEvent>('spell-casting-begin', spellName => {
        // Write helper to check to see if we've already
        // completed this spell before starting the game
        const { dialog, shouldPlay } = getSpellInteractionDialog(spellName);
        openDialog({
            ...dialog,
            onClose: () => shouldPlay && toggleMiniGameState(spellName, true),
        });
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

            <Player
                canWalk={!isGeminioStarted && !isPatronumStarted && !isStupefyStarted}
                x={2}
                y={5}
            />
            {isStupefyStarted && (
                <SpellcastingOverlay
                    startingLevel={3}
                    maxLevel={5}
                    maxTimePerLevel={5000}
                    onGameEnd={onGameEnd}
                    spellName="stupefy"
                />
            )}
            {isPatronumStarted && (
                <SpellcastingOverlay
                    startingLevel={4}
                    maxLevel={7}
                    maxTimePerLevel={4000}
                    onGameEnd={onGameEnd}
                    spellName="patronum"
                />
            )}
            {isGeminioStarted && (
                <SpellcastingOverlay
                    startingLevel={4}
                    maxLevel={8}
                    maxTimePerLevel={2500}
                    onGameEnd={onGameEnd}
                    spellName="geminio"
                />
            )}
        </>
    );
}
