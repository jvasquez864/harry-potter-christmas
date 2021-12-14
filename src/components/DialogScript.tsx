import useGame from '../@core/useGame';
import useGameLoop from '../@core/useGameLoop';
import useKeyPress from '../@core/useKeyPress';
import usePointerClick from '../@core/usePointerClick';

export interface DialogInfo {
    character: string;
    dialog: string[];
}

export default function DialogScript() {
    const { isDialogOpen, advanceDialogPage, paused } = useGame();

    // mouse controls
    usePointerClick(event => {
        if (!isDialogOpen || paused) return;
        if (event.button === 0) {
            advanceDialogPage();
        }
    });

    return null;
}
