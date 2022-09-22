/* eslint-disable no-undef */
import { hlsPlayback } from "./hlsPlayer";
import { nativePlayback } from "./nativePlayer";
import { shakaPlayback } from "./shakaPlayer";

export const init = (playerType, streamType, sDRMType, tokenType) => {
    console.log("Initiating player", playerType, streamType, sDRMType, tokenType)
    let hlsPlayer = new Hls(Object.assign({}));
    let player = document.getElementById("video")

    function handleError(event)  {
        console.log("I am error Harshada" + event)
        document.getElementById("error").innerHTML = "harshada" + event.target.error
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
