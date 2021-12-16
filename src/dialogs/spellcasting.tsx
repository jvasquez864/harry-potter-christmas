import { DialogInfo } from 'src/components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    'learn-stupefy': {
        dialog: [
            {
                text:
                    'This first one is an old favorite.  Simple, but very effective - Stupefy, also known as the Stunning spell.  This spell will freeze objects and make living targets unconscious.',
                character: 'dumbledore',
            },
            {
                text:
                    "Why are we spending time with these spells, Professor?  Shouldn't we be working on more important things?",
                character: 'harry',
            },
            {
                text: 'These are important things, Harry.  Are you ready?',
                character: 'dumbledore',
            },
            {
                text:
                    "Perfect.  Let me explain how this will work then.  For each cast of the spell, you will be presented a series of arrows.  Use the arrow keys on your keyboard to press the arrows in the order they appear.  If you're too slow, you lose.  Got it?",
                character: 'dumbledore',
            },
            {
                text: 'Sounds simple enough.',
                character: 'harry',
            },

            {
                text: 'Very well. Begin!',
                character: 'dumbledore',
            },
        ],
    },
};
