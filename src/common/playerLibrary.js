/* eslint-disable no-undef */
import { hlsPlayback } from "../players/hlsPlayer";
import { nativePlayback } from "../players/nativePlayer";
import { shakaPlayback } from "../players/shakaPlayer";
import Logger from "./logger";

export const init = (playerType, streamType, sDRMType, tokenType) => {
    const loggerInstance = new Logger();
    loggerInstance.init();

    loggerInstance.log("Initiating player", playerType, streamType, sDRMType, tokenType)
    let hlsPlayer = new Hls(Object.assign({}));
    let player = document.getElementById("video")

    function handleError(event)  {
        loggerInstance.log("player error occurred" + JSON.stringify(event.target.error))
        // document.getElementById("error").innerHTML = "harshada" + event.target.error
    }

    player.addEventListener("error", handleError)
  
    switch (playerType) {
        case "hls":
            hlsPlayback(player, hlsPlayer,streamType)
            break;

        case "native":
            nativePlayback(player, streamType)
            break;

        case "shaka":
            shakaPlayback(sDRMType,tokenType,player,streamType)
            break;

        default:
            //
            break;
    }

}
