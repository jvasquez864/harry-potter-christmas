import { DialogInfo } from 'src/components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    g0: {
        dialog: [
            {
                text:
                    'Harry shakes the gate, but is disappointed to find out the gate is locked tight.  He leans in closer and gets a strong smell of citrus.',
                character: 'harry',
            },
            {
                text: '"I\'ve smelled this before... but I don\'t quite remember where."',
                character: 'harry',
            },
        ],
    },
    g1: {
        dialog: [
            {
                text:
                    'Harry shakes the gate, but is disappointed to find out the gate is locked tight.  He leans in closer and gets a strong smell of citrus.',
                character: 'harry',
            },
            {
                text: '"I\'ve smelled this before... but I don\'t quite remember where."',
                character: 'harry',
            },
        ],
    },
    g2: {
        dialog: [
            {
                text:
                    'Harry shakes the gate, but is disappointed to find out the gate is locked tight.  He leans in closer and gets a strong smell of citrus.',
                character: 'harry',
            },
            {
                text: '"I\'ve smelled this before... but I don\'t quite remember where."',
                character: 'harry',
            },
        ],
    },
    'memory-game-loss': {
        dialog: [
            {
                text:
                    "You have to pay more attention, Harry!  You blacked out in there - I managed to help you escape just in the nick of time.  Only go back when you are sure you're ready.",
                character: 'dumbledore',
            },
        ],
    },
    'memory-game-win': {
        dialog: [
            {
                text:
                    'Well done, Harry!  I knew you could do it.  Voldemort managed to get away this time, but we should take advantage of this time to train and become stronger.',
                character: 'dumbledore',
            },
        ],
    },
};
