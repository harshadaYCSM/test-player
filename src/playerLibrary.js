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

        case "shaka":
            let shakaPlayer = new window.shaka.Player(player);
            if (streamType === "dash") {
                if (sDRMType === "widevine") {
                    if (tokenType === "customdata") {
                        let wideVineLicenceUrl = "https://drm-widevine-licensing.axtest.net/AcquireLicense"
                        let wideVineTokenName = "X-AxDRM-Message"
                        let wideVineToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.4lWwW46k-oWcah8oN18LPj5OLS5ZU-_AQv7fe0JhNjA"
                        shakaPlayer.configure({
                            streaming: {
                                alwaysStreamText: true
                            },
                            drm: {
                                servers: {
                                    'com.widevine.alpha': wideVineLicenceUrl,
                                    // 'com.microsoft.playready': playreadyLicenceUrl
                                }
                            },
                        });
                        shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
                            if (type === window.shaka.net.NetworkingEngine.RequestType.LICENSE) {
                                request.headers[wideVineTokenName] = wideVineToken;
                            }
                        });
                    }
                }
            }
            shakaPlayer.load(urls.dash1).then(() => player.play())
            break;

        default:
            //
            break;
    }




}
