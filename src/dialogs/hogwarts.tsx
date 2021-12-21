import { DialogInfo } from 'src/components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    'g0-closed': {
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
    'g0-opened': {
        dialog: [
            {
                text: 'You slide the key in and the gate finally opens!',
                character: 'harry',
            },
            {
                text:
                    '"Bloody hell, what\'s that sound?  Why do I always end up in these situations...  Let me get my robe before I go in."',
                character: 'harry',
            },
        ],
    },
    'g1-closed': {
        dialog: [
            {
                text:
                    "What am I doing here?  Perhaps I should come back later, when I'm ready.",
                character: 'harry',
            },
        ],
    },
    'g1-opened': {
        dialog: [
            {
                text: 'I wonder what Dumbledore has in store for me now...',
                character: 'harry',
            },
        ],
    },
    'g2-closed': {
        dialog: [
            {
                text:
                    "What am I doing here?  Perhaps I should come back later, when I'm ready.",
                character: 'harry',
            },
        ],
    },
    'g2-opened': {
        dialog: [
            {
                text: 'I have a strange feeling about this...',
                character: 'harry',
            },
        ],
    },
    loss: {
        dialog: [
            {
                text:
                    "You have to pay more attention, Harry!  You blacked out in there - I managed to help you escape just in the nick of time.  Only go back when you are sure you're ready.",
                character: 'dumbledore',
            },
        ],
    },
    win: {
        dialog: [
            {
                text:
                    'Well done, Harry!  I knew you could do it.  Voldemort managed to get away this time, but we should take advantage of this time to train and become stronger.',
                character: 'dumbledore',
            },
        ],
    },
    'new-game': {
        dialog: [
            {
                text:
                    "Being at Hogwarts during the holiday season isn't new to me, but why do I have this strange feeling?  I should look around and see what's going on. \n\n\n (Click outside the dialog window to continue)",
                character: 'harry',
            },
            {
                text:
                    'It looks like I can move around using the W A S D keys, and can interact with objects by left clicking on them.',
                character: 'harry',
            },
        ],
    },
    sword: {
        dialog: [
            {
                text: "Looks like it's just a regular sword.",
                character: 'harry',
            },
        ],
    },
    barrel: {
        dialog: [
            {
                text:
                    'The barrel is oozing a horrendous smell.  Someone must have cast a spell on it as a prank.',
                character: 'harry',
            },
        ],
    },
    crate: {
        dialog: [
            {
                text: "It's just a crate... but I really want to try and break it.",
                character: 'harry',
            },
        ],
    },
    mantle: {
        dialog: [
            {
                text:
                    'There are rough marks on this... almost as if people were running by and kept getting something stuck onto the fabric.  I wonder what the commotion was about.',
                character: 'harry',
            },
        ],
    },
};
