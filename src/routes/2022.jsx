import { Howl, Howler } from 'howler';
import { TypeAnimation } from 'react-type-animation';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import messages from '../assets/messages.json';
import { Icon } from '@iconify/react';

console.log(messages[0].type);

Howler.stop();

const sound = new Howl({
    src: ['./testify_story.mp3'],
    loop: true,
    autoUnlock: true,
    autoplay: true,
    pool: 1,
});

function DeferButton() {
    return (
        <div className='z-[100] text-xl absolute inline bottom-0 right-0 md:bottom-20 md:right-20 text-slate-300 animate__animated animate__delay-3s animate__fadeInRight p-8 rounded-sm shadow-xl '>
            <div className='text-slate-300 inline animate__animated animate__delay-5s animate__fadeOut px-2'>继续阅读</div>
            <Icon icon="ic:baseline-keyboard-double-arrow-right" className='inline  text-4xl' />
        </div>
    );
}

function Year2022() {
    // State Initialization
    const [messageID, setMessageID] = useState(0);
    const [isAudioPlaying, setAudioState] = useState(false);
    const mainAnimateElement = useRef([]);
    const navigateNextMessage = () => {
        const currentElement = mainAnimateElement.current
        currentElement.classList.add('animate__animated', 'animate__fadeOut');
        setTimeout(() => { setMessageID(messageID + 1) }, 3000);
    }


    // Audio Initialization
    if (!isAudioPlaying) { setAudioState(!isAudioPlaying); sound.play(); sound.fade(0, 1, 3000);}

    // Parsing JSON to Respective Interface
    switch (messages[messageID].type) {
        case "header":
            // Layout for header
            return (
                <div className='bg-black w-screen h-screen'>
                    <div className='w-screen h-screen flex flex-col items-center justify-center text-4xl gap-y-16 animate__animated animate__fadeIn animate__slow' ref={mainAnimateElement}>
                        <TypeAnimation
                            sequence={[
                                1000,
                                (messages[messageID].text),
                            ]}
                            wrapper="h1"
                            cursor={true}
                            repeat={false}
                            speed={300}
                        />
                        <div onClick={navigateNextMessage}><DeferButton /></div>
                    </div>
                </div>
            );
        case "paragraph":
            // Layout for paragraphs
            return (
                <div className='bg-black h-screen w-screen items-center justify-center z-0 '>
                    <div ref={mainAnimateElement}>
                        <img src={messages[messageID].background} className="object-none absolute w-screen h-screen top-0 left-0  z-10 animate__animated animate__delay-1s animate__fadeInDown animate__slower" />
                        <div className='z-20 absolute w-screen h-screen bg-black bg-opacity-80 p-8 md:p-16 tracking-wide md:tracking-widest flex text-xl text-left animate__animated animate__delay-3s animate__fadeIn animate__slow' >
                            <p className='self-center p-0 md:p-24'>{messages[messageID].text}</p>
                        </div>
                        <div onClick={navigateNextMessage}><DeferButton /></div>
                    </div>
                </div>
            );
        case "quote":
            // Layout for quotes
            return (
                <div className='bg-black w-screen h-screen '>
                    <div className='flex items-center justify-center p-8 md:p-24 w-screen h-screen' ref={mainAnimateElement}>
                        <div className='text-2xl gap-y-8 leading-loose m-0 md:m-24'>
                            <TypeAnimation
                                sequence={[
                                    1000,
                                    (messages[messageID].text + "\n--" + messages[messageID].author),
                                ]}
                                wrapper="h1"
                                cursor={true}
                                repeat={false}
                                speed={300}
                                style={{ display: 'inline-block' }}
                            />
                            {/* <p className='text-right animate__animated'>--{messages[messageID].author}</p> */}
                        </div>
                        <div onClick={navigateNextMessage}><DeferButton /></div>
                    </div>
                </div>
            );
        case "footer":
            sound.fade(1, 0, 2000);
            return (
                <div className='bg-black w-screen h-screen '>
                    <div className='p-16 flex flex-col items-center justify-center w-screen h-screen gap-y-4'>
                        <div className='tracking-widest flex flex-col items-center justify-center w-screen h-screen gap-y-8'>
                            <h1 className='text-2xl p-8 text-center animate__animated animate__fadeIn animate__slow'>您已阅读完毕，感谢您耐心的阅读。</h1>
                            <a href='/' className='text-slate-300 flex flex-row justify-center items-center gap-x-2 px-8 py-4 rounded-sm border-slate-300 border transition duration-300 hover:bg-slate-300 hover:text-black select-none animate__animated animate__delay-2s animate__fadeIn animate__slow'>
                                <Icon icon="ic:outline-replay" />
                                <p>重新阅读</p>
                            </a>
                        </div>
                    </div>

                </div>
            );
        default:
            console.log("Incorrect Type");
    }
};

export default Year2022;