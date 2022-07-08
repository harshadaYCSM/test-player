/* eslint-disable no-undef */
import { tokens } from "./constants";
import { urls } from "./urls";
import { hlsPlayback } from "./hlsPlayer";

export const init = (playerType, streamType, sDRMType, tokenType) => {
    console.log("Initiating player", playerType, streamType, sDRMType, tokenType)
    let hlsPlayer = new Hls(Object.assign({}));
    let player = document.getElementById("video")
    function handleError(event)  {
        console.log("I am error Harshada" + event)
        document.getElementById("error").innerHTML = "harshada"
    }

    player.addEventListener("error", handleError)
  
    switch (playerType) {
        case "hls":
            hlsPlayback(player, hlsPlayer,streamType)
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
            let playUrl = null
            if (streamType === "dash") {
                if (sDRMType === "widevine") {
                    if (tokenType === "customdata") {
                        shakaPlayer.configure({
                            drm: {
                                servers: {
                                    'com.widevine.alpha': "https://drm-widevine-licensing.axtest.net/AcquireLicense",
                                }
                            },
                        });
                        shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
                            if (type === window.shaka.net.NetworkingEngine.RequestType.LICENSE) {
                                request.headers["X-AxDRM-Message"] = tokens.wideVineToken;
                            }
                        });
                        playUrl = urls.dashwithToken
                    } else {
                        shakaPlayer.configure({
                            drm: {
                                servers: {
                                    'com.widevine.alpha': "https://cwip-shaka-proxy.appspot.com/no_auth",
                                }
                            },
                        });
                        playUrl = urls.dashWidevineWithoutToken
                    }
                } else if (sDRMType === "playready") {
                    if (tokenType === "customdata") {
                        shakaPlayer.configure({
                            streaming: {
                                alwaysStreamText: true
                            },
                            drm: {
                                servers: {
                                    // 'com.widevine.alpha': wideVineLicenceUrl,
                                    'com.microsoft.playready': "https://drm-playready-licensing.axtest.net/AcquireLicense"
                                }
                            },
                        });
                        shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
                            if (type === window.shaka.net.NetworkingEngine.RequestType.LICENSE) {
                                request.headers["X-AxDRM-Message"] = tokens.playReadyToken;
                            }
                        });
                        playUrl = urls.dashwithToken
                    } else {
                        playUrl = urls.dashPlayreadyWithoutToken
                    }
                } else {
                    playUrl = urls.dashWithoutDRMAndToken
                }
                shakaPlayer.load(playUrl).then(() => player.play())
            } else if (streamType === "hls") {
                shakaPlayer.load(urls.hls1).then(() => player.play())
            } else if (streamType === "mss" && sDRMType === "playready") {
                if (tokenType === "customData") {
                    shakaPlayer.configure({
                        drm: {
                            servers: {
                                // 'com.widevine.alpha': wideVineLicenceUrl,
                                'com.microsoft.playready': "http://playready.directtaps.net/pr/svc/rightsmanager.asmx?"
                            }
                        },
                    });

                    shakaPlayer.load(urls.mssWithDRMNoToken).then(() => player.play())
                } else {
                    shakaPlayer.load(urls.mssWithoutDRMAndToken).then(() => player.play())
                }
            }
            break;

        default:
            //
            break;
    }

    
    



}
