import { css, Global } from '@emotion/core';
import React from 'react';
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

    return (
        <>
            <Global styles={globalStyles} />
            <div css={styles.root(width, height)}>
                <Game cameraZoom={80}>
                    <AssetLoader urls={urls} placeholder="Loading assets ...">
                        <SceneManager defaultScene="dumbelldoreChamber">
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
            </div>
        </>
    );
}
