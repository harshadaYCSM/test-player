/* eslint-disable no-unused-vars */
import { urls } from "../common/urls";
export const nativePlayback = (player, streamType) => {

    switch (streamType) {

        case "hls":
            let hlsUrl = document.getElementById("urls").value ?
                document.getElementById("urls").value : urls.hls2
            player.src = hlsUrl
            player.play()
            break;

        case "dash":
            document.getElementById("logger").innerHTML = "Under Construction"
            break;

        case "mss":
            document.getElementById("logger").innerHTML = "Under Construction"
            break;

        default:
            //
            break;
    }


}


