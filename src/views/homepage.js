import Player from "../utility/player";

function Homepage() {

    let player = Player()

    return (
        <div className="Player">
            <video className="video" id="video"></video>
            <div className='logger' id='logger'></div>
            <div className='buttonWrapper'>
                <button onClick={player.playMp4}>Play mp4 on Native</button>
                <button onClick={player.playHls}>Play hls on Native</button>
                <button onClick={player.playHlsLiveOnHls}>Play hls live on Hls</button><br></br><br></br>
                <form onSubmit={player.playStream}>
                    <label>Player:
                        <select id="player" onChange={player.handleSelectChange} defaultValue="hls">
                            <option value="hls">HLS Player</option>
                            <option value="shaka">Shaka</option>
                            <option value="native">Native</option>
                            <option value="dashjs">Dashjs</option>
                        </select>
                    </label>

                    <label>   Stream:
                        <select id="stream" onChange={player.handleSelectChange}>
                            <option value="hls">hls-m3u8</option>
                            <option value="dash">dash-mpd</option>
                            <option value="mss">mss-ism</option>
                        </select>
                    </label>

                    <label>    Security/DRM:
                        <select id="sDRM" onChange={player.handleSelectChange}>
                            <option value="none">None</option>
                            <option value="widevine">Widevine</option>
                            <option value="playready">PlayReady</option>
                            <option value="aes">AES</option>

                        </select>
                    </label>

                    <label>    Token:
                        <select id="token" onChange={player.handleSelectChange}>
                            <option value="none">None</option>
                            <option value="customdata">Custom Data</option>
                            <option value="aes">AES-128</option>
                        </select>
                    </label>
                    <br></br><br></br>
                    <label>URL:
                        <input type="text" id="urls"></input>
                    </label>
                    <input type="submit" value="Submit" />

                </form>
            </div>
        </div>
    )
}

export default Homepage;