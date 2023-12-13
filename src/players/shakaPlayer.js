/* eslint-disable no-unused-vars */
import { licenseUrls, urls } from "../common/urls";
import { tokens } from "../common/constants";
import loggerInstance from "../utility/logger";

const handleShakaError = (e) => {
    loggerInstance.log("Shaka error: " + (e.code || e.detail.code));
};

const configureDrm = (streamType, sDRMType, tokenType, shakaPlayer) => {
    const config = {
        drm: {
            servers: {}
        }
    };

    console.log("License URL : ", licenseUrls[streamType][sDRMType][tokenType])

    if (sDRMType === "widevine") {
        config.drm.servers['com.widevine.alpha'] = licenseUrls[streamType][sDRMType][tokenType]
    } else if (sDRMType === "playready") {
        config.drm.servers['com.microsoft.playready'] = licenseUrls[streamType][sDRMType][tokenType]
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

const loadAndPlay = (player, shakaPlayer, playUrl) => {
    console.log("URL combo:", urls)
    shakaPlayer.load(playUrl).then(() => {
        player.play();
    }).catch(handleShakaError);
};

export const shakaPlayback = (sDRMType, tokenType, player, streamType, shakaPlayer) => {
    let videoUrl = urls[streamType][sDRMType][tokenType];
    console.log("VIDEO URL : ", videoUrl)
    configureDrm(streamType, sDRMType, tokenType, shakaPlayer);
    loadAndPlay(player, shakaPlayer, videoUrl);
};
