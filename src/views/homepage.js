import Player from "../utility/player";
import '../styles/homepage.css';

function Homepage() {

    let player = new Player()


    return (<div className="player-container">
        <div className="video-container">
            <video className="video" id="video"></video>
        </div>
        <div className='logger' id='logger'></div>
        <div className='control-panel'>
            <button className="control-button" onClick={player.playMp4}>Play MP4 on Native</button>
            <button className="control-button" onClick={player.playHlsLiveOnHls}>Play HLS Live on Hls</button>
            <button className="control-button" onClick={player.clearConsole}>Clear Console</button>


            <form className="control-form" onSubmit={player.playStream}>
                <label className="control-label">Player:
                    <select className="control-select" id="player" onChange={player.handleSelectChange} defaultValue="hls">
                        <option value="hls">HLS Player</option>
                        <option value="shaka">Shaka</option>
                        <option value="native">Native</option>
                        <option value="dashjs">Dashjs</option>
                    </select>
                </label>

                <label className="control-label">Stream:
                    <select className="control-select" id="stream" onChange={player.handleSelectChange} defaultValue="hls">
                        <option value="hls">HLS-m3u8</option>
                        <option value="dash">Dash-mpd</option>
                        <option value="mss">MSS-ISM</option>
                    </select>
                </label>

                <label className="control-label">Security/DRM:
                    <select className="control-select" id="sDRM" onChange={player.handleSelectChange} defaultValue="none">
                        <option value="none">None</option>
                        <option value="widevine">Widevine</option>
                        <option value="playready">PlayReady</option>
                        <option value="aes">AES</option>
                    </select>
                </label>

                <label className="control-label">Token:
                    <select className="control-select" id="token" onChange={player.handleSelectChange} defaultValue="none">
                        <option value="none">None</option>
                        <option value="customdata">Custom Data</option>
                        <option value="aes">AES-128</option>
                    </select>
                </label>

                <label className="control-label">URL:
                    <input className="control-input" type="text" id="urls" defaultValue="https://default.url"></input>
                </label>

                <input className="control-submit" type="submit" value="Submit" />
            </form>
        </div>
        <div className="info-container"></div>
    </div>
    );

}

export default Homepage;