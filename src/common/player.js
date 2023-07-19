import '../styles/player.css'
import { init } from './playerLibrary'
import Logger from './logger'

function Player() {
    let playerType = ""
    let streamType = ""
    let sDRMType = ""
    let tokenType = ""
    const loggerInstance = new Logger();


    const playMp4 = () => {
        let player = document.getElementById("video")
        player.src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        player.play()
    }

    const playHls = () => {
        let player = document.getElementById("video")
        player.src = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        player.play()
    }

    const playHlsLiveOnHls = () => {
        playerType = "hls"
        streamType = "live"
        init(playerType, streamType, sDRMType, tokenType)
    }

    const handleSelectChange = (e) => {
        if (e.target.id === "player") {
            playerType = e.target.value 
        } else if (e.target.id === "stream") {
            streamType = e.target.value
        } else if (e.target.id === "sDRM") {
            sDRMType = e.target.value
        } else if (e.target.id === "token") {
            tokenType = e.target.value  
        } /* else {// default values 
            playerType = "hls"
            streamType = "hls"
            sDRMType = "none"
            tokenType = "none"
        } */
    }

    const playHere = (event) => {
        event.preventDefault();
        loggerInstance.log(JSON.stringify("Player:" + playerType + " | " 
        + "Stream:" + streamType + " | " 
        + "DRM:" +sDRMType  + " | " 
        + "Token:" + tokenType))
        init(playerType, streamType, sDRMType, tokenType)
    }
    return (
        <div className="Player">
            <video className="video" id="video"></video>
            <div className='logger' id='logger'></div>
            <div className='buttonWrapper'>
                <button onClick={playMp4}>Play mp4 on Native</button>
                <button onClick={playHls}>Play hls on Native</button>
                <button onClick={playHlsLiveOnHls}>Play hls live on Hls</button><br></br><br></br>
                <form onSubmit={playHere}>
                    <label>Player:
                        <select id="player" onChange={handleSelectChange} defaultValue="hls">
                            <option value="hls">HLS Player</option>
                            <option value="shaka">Shaka</option>
                            <option value="native">Native</option>
                            <option value="dashjs">Dashjs</option>
                        </select>
                    </label>

                    <label>   Stream:
                        <select id="stream" onChange={handleSelectChange}>
                            <option value="hls">hls-m3u8</option>
                            <option value="dash">dash-mpd</option>
                            <option value="mss">mss-ism</option>
                        </select>
                    </label>

                    <label>    Security/DRM:
                        <select id="sDRM" onChange={handleSelectChange}>
                            <option value="none">None</option>
                            <option value="widevine">Widevine</option>
                            <option value="playready">PlayReady</option>
                            <option value="aes">AES</option>

                        </select>
                    </label>

                    <label>    Token:
                        <select id="token" onChange={handleSelectChange}>
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

export default Player;