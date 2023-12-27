/* eslint-disable no-undef */
import loggerInstance from "../utility/logger";
import { licenseUrls, urls } from "../common/urls";

export const dashjsPlayback = (sDRMType, tokenType, player, streamType, dashjsPlayer) => {
    if (streamType === "hls") {
        loggerInstance.log("Dashsjs player cannot play hls streams")
    } else {
        loggerInstance.log("Initiating Dashjs player")

        let videoUrl = urls[streamType][sDRMType][tokenType];
        console.log("VIDEO URL : ", videoUrl)
        dashjsPlayer.initialize(player, videoUrl, true);
        player.play()
    }


    /* switch (streamType) {
        case "hls":
            // code
            break;

        case "dash":
            // code

            // const protData = {
            //     "com.widevine.alpha": {
            //         "serverURL": "https://drm-widevine-licensing.axtest.net/AcquireLicense"
            //     },
            //     "com.microsoft.playready": {
            //         "serverURL": "https://drm-playready-licensing.axtest.net/AcquireLicense"
            //     }
            // };

            // dashjsPlayer.setProtectionData(protData);

            
            break;

        default:
        // nothing
    } */
}