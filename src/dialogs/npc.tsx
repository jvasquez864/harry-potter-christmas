import { DialogInfo } from '../components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    'dumbledore-player': {
        dialog: [
            {
                text: 'I have good news and bad news, Harry.',
                character: 'dumbledore',
            },
            {
                text: 'Give me the bad news first...',
                character: 'harry',
            },
            {
                text:
                    'Voldemort is still alive.  He managed to get away, clinging on to the bit of life left in him.',
                character: 'dumbledore',
            },
            {
                text: 'Please tell me the good news.',
                character: 'harry',
            },
            {
                text:
                    'The good news is that we have sources that are locating him as we speak, and it should be a matter of time before we have the information necessary to take him down',
                character: 'dumbledore',
            },
            {
                text: "I'm ready now.  I want this to be over.",
                character: 'harry',
            },
            {
                text:
                    "Don't be reckless.  While we locate Voldemort, I know a couple of fantastic young wizards who you would make a great team with.  Contact them as soon as you can and let them know what's going on.  We're going to need all the help we can get.",
                character: 'dumbledore',
            },
        ],
    },
};
