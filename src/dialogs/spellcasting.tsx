import { DialogInfo } from 'src/components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    intro: {
        dialog: [
            {
                text:
                    "Aghhh! My head!  What is this feeling... I haven't felt this feeling since...",
                character: 'harry',
            },
            {
                text:
                    "Hahahahaha.  Foolish child.  Did you really think you would get rid of me that easily?  I am the dark lord. And you?  You're nothing but a child who is known only through my power",
                character: 'voldemort',
            },
            {
                text:
                    'Harry!  You have to stay strong.  You have to fight.  You CANNOT let him into your mind.',
                character: 'dumbledore',
            },
            {
                text: "Professor.  How are you... You're dead.",
                character: 'harry',
            },
            {
                text: 'I will always be with you, Harry',
                character: 'dumbledore',
            },

            {
                text: "Charming, Harry.  Let's see how helpful the deceased are to you.",
                character: 'voldemort',
            },
        ],
    },
};
