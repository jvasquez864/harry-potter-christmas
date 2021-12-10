import { SpriteProps } from './@core/Sprite';

const spriteData: { [index: string]: SpriteProps } = {
    ui: {
        src: './assets/ui.png',
        sheet: {
            'self-select': [
                [4, 0],
                [5, 0],
            ],
            select: [[4, 0]],
            dot: [[1, 0]],
            solid: [[0, 1]],
        },
    },
    player: {
        src: './assets/player.png',
        frameWidth: 20,
        frameHeight: 20,
        frameTime: 300,
        sheet: {
            default: [[0, 2]],
            walk: [
                [1, 2],
                [2, 2],
            ],
            action: [
                [0, 1],
                [2, 1],
            ],
        },
    },
    objects: {
        src: './assets/objects2.png',
        frameWidth: 32,
        frameHeight: 32,
        sheet: {
            floor: [[0, 4]],
            'wall-top': [[4, 13]],
            'wall-side': [[1, 11]],
            'workstation-1': [[0, 1]],
            'workstation-2': [[1, 1]],
            'coffee-machine': [[2, 1]],
            'coffee-machine-empty': [[3, 1]],
            pizza: [[4, 1]],
            plant: [[0, 2]],
            //

            grass1: [[0, 4]],
            'grass2-0': [[1, 3]],
            'grass2-1': [[2, 3]],
            'grass3-0': [[0, 0]],
            'grass3-1': [[1, 0]],
            'grass3-2': [[2, 0]],
            'grass3-3': [[0, 1]],
            'grass3-4': [[1, 1]],
            'grass3-5': [[2, 1]],
            'grass3-6': [[0, 2]],
            'grass3-7': [[1, 2]],
            'grass3-8': [[2, 2]],
            'vendor0-0': [[0, 5]],
            'vendor0-1': [[1, 5]],
            'vendor0-2': [[0, 6]],
            'vendor0-3': [[1, 6]],
        },
    },
    footstep: {
        src: './assets/footstep.png',
        sheet: {
            default: [
                [0, 0],
                [2, 0],
            ],
        },
        opacity: 0.75,
        frameTime: 150,
    },
};

export default spriteData;
