/* eslint-disable no-unused-vars */
import { urls } from "./urls";
export const hlsPlayback = (player, hlsPlayer, streamType) => {

    switch (streamType) {
        
        case "hls":
            let hlsUrl = document.getElementById("urls").value ? 
                document.getElementById("urls").value : urls.hls1
            hlsPlayer.loadSource(hlsUrl);
            hlsPlayer.attachMedia(player);
            hlsPlayer.startLoad();
            player.play()
            break;

        case "dash":
            document.getElementById("error").innerHTML = "HLS player connot play mpd streams"
            break;

        case "mss":
            document.getElementById("error").innerHTML = "HLS player connot play mss streams"
            break;

        default:
            //
            break;
    }


}


