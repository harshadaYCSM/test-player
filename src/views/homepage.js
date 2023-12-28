import React, { useRef } from 'react';
import Player from '../utility/player';
import '../styles/homepage.css';

function Homepage() {
    let player = new Player();
    const playMp4ButtonRef = useRef(null);
    const playHlsButtonRef = useRef(null);
    const clearConsoleButtonRef = useRef(null);
    const playerSelectRef = useRef(null);
    const streamSelectRef = useRef(null);
    const sDRMSelectRef = useRef(null);
    const tokenSelectRef = useRef(null);
    const urlsInputRef = useRef(null);
    const submitButtonRef = useRef(null);

    const handleKeyDown = (event) => {
        const focusableElements = [
            playMp4ButtonRef,
            playHlsButtonRef,
            clearConsoleButtonRef,
            playerSelectRef,
            streamSelectRef,
            sDRMSelectRef,
            tokenSelectRef,
            urlsInputRef,
            submitButtonRef,
            // Add more refs for additional focusable elements
        ];

        const currentIndex = focusableElements.findIndex((ref) => ref.current === document.activeElement);

        switch (event.key) {
            case 'ArrowRight':
                focusableElements[(currentIndex + 1) % focusableElements.length].current.focus();
                break;
            case 'ArrowLeft':
                focusableElements[(currentIndex - 1 + focusableElements.length) % focusableElements.length].current.focus();
                break;
            // Add more cases as needed
            default:
                break;
        }
    };

    return (
        <div className="player-container" onKeyDown={handleKeyDown} tabIndex="0">
            <div className="video-container">
                <video className="video" id="video"></video>
            </div>
            <div className='logger' id='logger'></div>
            <div className='control-panel'>
                <button
                    className="control-button"
                    onClick={player.playMp4}
                    ref={playMp4ButtonRef}
                    autoFocus
                >
                    Play MP4 on Native
                </button>
                <button
                    className="control-button"
                    onClick={player.playHlsLiveOnHls}
                    ref={playHlsButtonRef}
                >
                    Play HLS Live on Hls
                </button>
                <button
                    className="control-button"
                    onClick={player.clearConsole}
                    ref={clearConsoleButtonRef}
                >
                    Clear Console
                </button>
                <form className="control-form" onSubmit={player.playStream}>
                    <label className="control-label">
                        Player:
                        <select
                            className="control-select"
                            id="player"
                            onChange={player.handleSelectChange}
                            defaultValue="hls"
                            ref={playerSelectRef}
                        >
                            <option value="hls">HLS Player</option>
                            <option value="shaka">Shaka</option>
                            <option value="native">Native</option>
                            <option value="dashjs">Dashjs</option>
                        </select>
                    </label>
                    <label className="control-label">
                        Stream:
                        <select
                            className="control-select"
                            id="stream"
                            onChange={player.handleSelectChange}
                            defaultValue="hls"
                            ref={streamSelectRef}
                        >
                            <option value="hls">HLS-m3u8</option>
                            <option value="dash">Dash-mpd</option>
                            <option value="mss">MSS-ISM</option>
                        </select>
                    </label>
                    <label className="control-label">
                        Security/DRM:
                        <select
                            className="control-select"
                            id="sDRM"
                            onChange={player.handleSelectChange}
                            defaultValue="none"
                            ref={sDRMSelectRef}
                        >
                            <option value="none">None</option>
                            <option value="widevine">Widevine</option>
                            <option value="playready">PlayReady</option>
                            <option value="aes">AES</option>
                        </select>
                    </label>
                    <label className="control-label">
                        Token:
                        <select
                            className="control-select"
                            id="token"
                            onChange={player.handleSelectChange}
                            defaultValue="none"
                            ref={tokenSelectRef}
                        >
                            <option value="none">None</option>
                            <option value="customdata">Custom Data</option>
                            <option value="aes">AES-128</option>
                        </select>
                    </label>
                    <label className="control-label">
                        URL:
                        <input
                            className="control-input"
                            type="text"
                            id="urls"
                            defaultValue="https://default.url"
                            ref={urlsInputRef}
                        />
                    </label>
                    <input className="control-submit" type="submit" value="Submit" ref={submitButtonRef} />
                </form>
            </div>
            <div className="info-container"></div>
        </div>
    );
}

export default Homepage;
