/* eslint-disable no-undef */
import { urls } from "./urls";

export const init = (playerType, streamType, sDRMType, tokenType) => {
    console.log("Initiating player", playerType, streamType, sDRMType, tokenType)
    let hlsPlayer = new Hls(Object.assign({})); 
    let player = document.getElementById("video")
    if (playerType === "hls" && streamType === "hls") {
        if (sDRMType === "none") {
            hlsPlayer.loadSource(urls.hls);
            hlsPlayer.attachMedia(player);
            hlsPlayer.startLoad();
            player.play()
        } else if (sDRMType === "aes") {
            //
        }
    }
}
