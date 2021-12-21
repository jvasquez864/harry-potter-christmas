/* eslint-disable jsx-a11y/media-has-caption */
import { css, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber';
import AssetLoader from './@core/AssetLoader';
import DialogOverlay from './@core/DialogOverlay';
import Game from './@core/Game';
import GameUi from './@core/GameUi';
import HtmlOverlay from './@core/HtmlOverlay';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import HogwartsScene from './scenes/HogwartsScene';
import SpellCastingGameScene from './scenes/SpellCastingGameScene';
import MemoryMatchGameScene from './scenes/MemoryMatchGameScene';
import soundData from './soundData';
import spriteData from './spriteData';
import globalStyles from './styles/global';
import BattleGameScene from './scenes/BattleGameScene';
import DumbledoreChamberScene from './scenes/DumbledoreChamberScene';

const styles = {
    root: (width: number, height: number) => css`
        display: flex;
        width: ${width - (width % 2)}px;
        height: ${height - (height % 2)}px;
        justify-content: center;
        align-items: center;
    `,
};

const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

export default function App() {
    const [width, height] = useWindowSize();
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        window.addEventListener('click', () => {
            setHasInteracted(true);
            window.removeEventListener('click', () => {
                /** */
            });
        });
    });

    return (
        <>
            <Global styles={globalStyles} />
            <div css={styles.root(width, height)}>
                <Game cameraZoom={80}>
                    <AssetLoader urls={urls} placeholder="Loading assets ...">
                        <SceneManager defaultScene="hogwarts">
                            <Scene id="hogwarts">
                                <HogwartsScene />
                            </Scene>
                            <Scene id="memoryMatch">
                                <MemoryMatchGameScene />
                            </Scene>
                            <Scene id="spellcasting">
                                <SpellCastingGameScene />
                            </Scene>
                            <Scene id="battleground">
                                <BattleGameScene />
                            </Scene>
                            <Scene id="dumbelldoreChamber">
                                <DumbledoreChamberScene />
                            </Scene>
                        </SceneManager>
                        <DialogOverlay />
                    </AssetLoader>
                </Game>
                {hasInteracted && (
                    <audio autoPlay loop>
                        <source src="./assets/sfx/background.mp3" type="audio/mp3" />
                    </audio>
                )}
            </div>
        </>
    );
}
