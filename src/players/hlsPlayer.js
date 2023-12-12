/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { urls } from "../common/urls";
import loggerInstance from "../utility/logger";


export const hlsPlayback = (player, streamType, sDRMType, tokenType, hlsPlayer) => {
    loggerInstance.log("Initiating hls player")

    hlsPlayer.on(window.Hls.Events.ERROR, (event, data) => {
        loggerInstance.log("HLS error : " + data.details + data.type)
    })
    switch (streamType) {

        case "hls":
            let hlsUrl = urls[streamType][sDRMType][tokenType]
            console.log("HLS URL :", hlsUrl)
            hlsPlayer.loadSource(hlsUrl);
            hlsPlayer.attachMedia(player);
            hlsPlayer.startLoad();
            player.play()
            break;

        case "live":
            let hlsUrlLive = document.getElementById("urls").value ?
                document.getElementById("urls").value : urls.hlslive
            hlsPlayer.loadSource(hlsUrlLive);
            hlsPlayer.attachMedia(player);
            hlsPlayer.startLoad();
            player.play()
            break;

        case "dash":
            loggerInstance.log("HLS player connot play mpd streams")
            break;

        case "mss":
            loggerInstance.log("HLS player connot play mss streams")
            break;

        default:
            //
            break;
    }
}


