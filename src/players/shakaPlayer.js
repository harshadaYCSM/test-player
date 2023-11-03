/* eslint-disable no-unused-vars */
import { urls } from "../common/urls";
import { tokens } from "../common/constants";
import loggerInstance from "../utility/logger";

export const shakaPlayback = (sDRMType, tokenType, player, streamType, shakaPlayer) => {
    let playUrl = null

    const handleShakaError = (e) => {
        loggerInstance.log(JSON.stringify("shaka error : " + e.code || e.detail.code))
    }
    shakaPlayer.addEventListener("error", handleShakaError);


    switch (streamType) {

        case "hls":
            shakaPlayer.load(urls.hls1).then(() => {
                player.play()
            })
                .catch(e => {
                    handleShakaError(e);
                }); // onError is executed if the asynchronous load fails.
            break;

        case "dash":
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
                        drm: {
                            servers: {
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
                    shakaPlayer.configure({
                        drm: {
                            servers: {
                                'com.microsoft.playready': "https://cwip-shaka-proxy.appspot.com/no_auth",
                            }
                        },
                    });
                    playUrl = urls.dashPlayreadyWithoutToken
                }
            } else {
                playUrl = urls.dashWithoutDRMAndToken
            }
            shakaPlayer.load(playUrl).then(() => {
                player.play()
            })
                .catch(e => {
                    handleShakaError(e);;
                });
            break;

        case "mss":
            if (streamType === "mss" && sDRMType === "playready") {
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
                        .catch(e => {
                            handleShakaError(e);;
                        });
                } else {
                    shakaPlayer.load(urls.mssWithoutDRMAndToken).then(() => player.play())
                        .catch(e => {
                            handleShakaError(e);;
                        });
                }
            } else {
                document.getElementById("error").innerHTML = "Not yet added/ supported"
            }
            document.getElementById("error").innerHTML = "Under Construction"
            break;

        default:
            //
            break;
    }
}


