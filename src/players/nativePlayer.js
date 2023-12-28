/* eslint-disable no-unused-vars */
import { urls } from "../common/urls";
export const nativePlayback = (player, streamType) => {

    switch (streamType) {
        case "hls":
            console.log("Playing native hls")

            let player = document.getElementById("video");
            player.src = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
            player.play();
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


