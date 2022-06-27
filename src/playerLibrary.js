/* eslint-disable no-undef */
import { urls } from "./urls";

export const init = (playerType, streamType, sDRMType, tokenType) => {
    console.log("Initiating player", playerType, streamType, sDRMType, tokenType)
    let hlsPlayer = new Hls(Object.assign({}));
    let player = document.getElementById("video")

    switch (playerType) {
        case "hls":
            if (streamType === "hls" && sDRMType === "none") {
                hlsPlayer.loadSource(urls.hls1);
                hlsPlayer.attachMedia(player);
                hlsPlayer.startLoad();
                player.play()
            } else if (sDRMType === "aes") {
                //
            }
            break;

        case "native":
            if (streamType === "hls") {
                let player = document.getElementById("video")
                player.src = urls.hls2
                player.play()
            }
            break;

        default:
            //
            break;
    }




}
