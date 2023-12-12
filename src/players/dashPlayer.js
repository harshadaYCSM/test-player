/* eslint-disable no-undef */
export const dashjsPlayback = (sDRMType, tokenType, player, streamType, dashjsPlayer) => {

    switch (streamType) {
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

            var url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
            dashjsPlayer.initialize(player, url, true);
            player.play()
            break;

        default:
        // nothing
    }
}