/* eslint-disable no-unused-vars */
import { licenseUrls, urls } from "../common/urls";
import { tokens } from "../common/constants";
import loggerInstance from "../utility/logger";

const handleShakaError = (e) => {
    loggerInstance.log("Shaka error: " + (e.code || e.detail.code));
};

const configureShakaPlayerForDashStream = (streamType, sDRMType, tokenType, shakaPlayer) => {
    const config = {
        drm: {
            servers: {}
        }
    };

    if (sDRMType === "widevine") {
        console.log("MUMMY license : ", licenseUrls[streamType][sDRMType][tokenType])
        // config.drm.servers['com.widevine.alpha'] = licenseUrls[streamType][sDRMType][tokenType]

        shakaPlayer.configure({
            drm: {
                servers: {
                    'com.widevine.alpha': licenseUrls[streamType][sDRMType][tokenType],
                }
            },
        });

    } else if (sDRMType === "playready") {
        console.log("AAAAA", licenseUrls[streamType][sDRMType][tokenType])
        // config.drm.servers['com.microsoft.playready'] = licenseUrls[streamType][sDRMType][tokenType]

        shakaPlayer.configure({
            drm: {
                servers: {
                    'com.microsoft.playready': licenseUrls[streamType][sDRMType][tokenType],
                }
            },
        });
    }

    shakaPlayer.configure(config);

    if (tokenType === "customdata") {
        shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
            if (type === window.shaka.net.NetworkingEngine.RequestType.LICENSE) {
                request.headers["X-AxDRM-Message"] = (sDRMType === "widevine") ?
                    tokens.wideVineToken :
                    tokens.playReadyToken;
            }
        });
    }

    return shakaPlayer;
};

const configureShakaPlayerForMssStream = (sDRMType, tokenType, shakaPlayer) => {
    if (tokenType === "customData" && sDRMType === "playready") {
        shakaPlayer.configure({
            drm: {
                servers: {
                    'com.microsoft.playready': "http://playready.directtaps.net/pr/svc/rightsmanager.asmx?"
                }
            },
        });
    }
};

const loadAndPlay = (player, shakaPlayer, playUrl) => {
    console.log("URL combo:", urls)
    shakaPlayer.load(playUrl).then(() => {
        player.play();
    }).catch(handleShakaError);
};

const getVideoUrl = () => {
    let url = "";


}

export const shakaPlayback = (sDRMType, tokenType, player, streamType, shakaPlayer) => {
    const errorElement = document.getElementById("error");
    let videoUrl = urls[streamType][sDRMType][tokenType];
    console.log("VIDEO URL : ", videoUrl)

    switch (streamType) {
        case "hls":
            configureShakaPlayerForDashStream(streamType, sDRMType, tokenType, shakaPlayer);
            loadAndPlay(player, shakaPlayer, videoUrl);
            break;

        case "dash":
            // const dashUrl = (sDRMType) ? urls.dashwithToken : urls.dashWithoutDRMAndToken;
            configureShakaPlayerForDashStream(streamType, sDRMType, tokenType, shakaPlayer);
            loadAndPlay(player, shakaPlayer, videoUrl);
            break;

        case "mss":
            if (sDRMType === "playready" || sDRMType === "none") {
                // const mssUrl = (tokenType === "customData") ? urls.mssWithDRMNoToken : urls.mssWithoutDRMAndToken;

                configureShakaPlayerForMssStream(sDRMType, tokenType, shakaPlayer);
                loadAndPlay(player, shakaPlayer, videoUrl);
            } else {
                errorElement.innerHTML = "Not yet added/supported";
            }
            break;

        default:
            //
            break;
    }
};
