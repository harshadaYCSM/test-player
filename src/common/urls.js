
// traversing -- stream - DRM - token

export const licenseUrls = {
    "dash": {
        "widevine": {
            "none": "https://cwip-shaka-proxy.appspot.com/no_auth",
            "customdata": "https://drm-widevine-licensing.axtest.net/AcquireLicense",
        },
        "playready": {
            "none": "https://cwip-shaka-proxy.appspot.com/no_auth",
            "customdata": "https://drm-playready-licensing.axprod.net/AcquireLicense",
        }
    },
    "mss": {
        "playready": {
            "none": "http://playready.directtaps.net/pr/svc/rightsmanager.asmx?"
        }
    }

}

export const urls = {
    "hls": {
        "none": {
            "none": "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
        },
        "aes": {
            "aes": "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
        },
    },
    "dash": {
        "none": {
            "none": "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
        },
        "widevine": {
            "customdata": "https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest_1080p.mpd",
            "none": "https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd",
        },
        "playready": {
            "customdata": "https://media.axprod.net/TestVectors/Cmaf/protected_1080p_h264_cbcs/manifest.mpd", // Add the appropriate URL
            "none": "https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd",
        },
    },
    "mss": {
        "playready": {
            "none": "http://playready.directtaps.net/smoothstreaming/ISMAAACHEPR/Taxi3_AACHE.ism/Manifest",
        },
        "none": {
            "none": "http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest"
        }
    },
    "hlslive": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
};

/*
1. URL: https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd
   Widevine License URL: https://cwip-shaka-proxy.appspot.com/no_auth
   mpdWidevineWithoutToken


*/
// https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine-hls/hls.m3u8
// https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans.key
// https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes-audio=65000-video=236000.m3u8
// "example": "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",

// export const urls = {
//     "hls1": "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
//     "hls2": "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
//     "hlsdrm": "https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine-hls/hls.m3u8",
//     "dashwithToken": "https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest_1080p.mpd",
//     "dashWithoutDRMAndToken": "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
//     "dashWidevineWithoutToken": "https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd",
//     "dashPlayreadyWithoutToken": "",
//     "mssWithoutDRMAndToken": "http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest",
//     "mssWithDRMNoToken": "http://playready.directtaps.net/smoothstreaming/ISMAAACHEPR/Taxi3_AACHE.ism/Manifest",
//     "hlslive": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"
// }
