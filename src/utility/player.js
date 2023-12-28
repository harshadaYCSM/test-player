/* 
   The Player module is written using the JavaScript Closure concept.
*/
/* 
   Disable eslint warning for undefined variables.
*/
/* eslint-disable no-undef */

import loggerInstance from "./logger";
import { hlsPlayback } from "../players/hlsPlayer";
import { nativePlayback } from "../players/nativePlayer";
import { shakaPlayback } from "../players/shakaPlayer";
import { dashjsPlayback } from "../players/dashPlayer";
import { eventHandlerMap } from '../common/constants';

function Player() {
    let playerType = "";
    let streamType = "";
    let sDRMType = "";
    let tokenType = "";
    let previousPlayer = "";
    let shakaPlayer = null;
    let hlsPlayer = null;
    let dashjsPlayer = null;
    let playerInstance = null;

    return {
        /**
         * Initialize the player with specified parameters.
         * 
         * @param {string} playerType - The type of player (e.g., "hls", "native", "shaka").
         * @param {string} streamType - The type of stream (e.g., "live", "vod").
         * @param {string} sDRMType - The type of DRM (e.g., "widevine", "playready").
         * @param {string} tokenType - The type of token (e.g., "customdata").
         */
        init: function (playerType, streamType, sDRMType, tokenType) {
            loggerInstance.init();
            loggerInstance.log("Initiating player", playerType, streamType, sDRMType, tokenType);
            let player = document.getElementById("video");

            /*
               Release any previous player and load video tag events.
            */
            this.releasePlayer()
                .then(() => {
                    this.loadVideoTagEvents(player);

                    switch (playerType) {
                        case "hls":
                            hlsPlayer = new Hls(Object.assign({}));
                            hlsPlayback(player, streamType, sDRMType, tokenType, hlsPlayer);
                            break;

                        case "native":
                            nativePlayback(player, streamType);
                            break;

                        case "shaka":
                            shakaPlayer = new window.shaka.Player(player);
                            shakaPlayback(sDRMType, tokenType, player, streamType, shakaPlayer);
                            break;

                        case "dashjs":
                            dashjsPlayer = dashjs.MediaPlayer().create();
                            dashjsPlayback(sDRMType, tokenType, player, streamType, dashjsPlayer);
                            break;

                        default:
                            // Handle other cases if needed.
                            break;
                    }
                });
        },

        /**
         * Load video tag events and attach them to the player.
         * 
         * @param {HTMLVideoElement} video - The HTML video element to attach events to.
         */
        loadVideoTagEvents: function (video) {
            console.log(video, eventHandlerMap);
            // Uncomment this block if needed.
            Object.keys(eventHandlerMap).forEach((event) => {
                video.addEventListener(event, eventHandlerMap[event]);
            });
        },

        clearConsole: function () {
            loggerInstance?.clearConsole()
        },

        /**
         * Play a sample MP4 video.
         */
        playMp4: function () {
            let player = document.getElementById("video");
            player.src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
            player.play();
        },

        /**
         * Play a sample HLS video.
         */
        playHls: function () {
            let player = document.getElementById("video");
            player.src = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
            player.play();
        },

        /**
         * Play a live HLS stream using the HLS player.
         */
        playHlsLiveOnHls: function () {
            playerType = "hls";
            streamType = "live";
            init(playerType, streamType, sDRMType, tokenType);
        },

        /**
         * Handle the change in player, stream, DRM, and token options.
         * 
         * @param {Event} e - The event object representing the change in player settings.
         */
        handleSelectChange: function (e) {
            if (e.target.id === "player") {
                playerType = e.target.value;
            } else if (e.target.id === "stream") {
                streamType = e.target.value;
            } else if (e.target.id === "sDRM") {
                sDRMType = e.target.value;
            } else if (e.target.id === "token") {
                tokenType = e.target.value;
            }
        },

        /**
         * Play the selected stream based on user input.
         * 
         * @param {Event} event - The event object representing the button click.
         */
        playStream: function (event) {
            loggerInstance.log("Previous Player Active: " + previousPlayer);
            event.preventDefault();

            playerInstance = new Player(); // Create an instance of the Player object

            // hard coding for now
            playerType = playerType === "" ? event.target[0].value : playerType
            streamType = streamType === "" ? event.target[1].value : streamType
            sDRMType = sDRMType === "" ? event.target[2].value : sDRMType
            tokenType = tokenType === "" ? event.target[3].value : tokenType

            loggerInstance.log("Player:" + playerType + " | Stream:" + streamType + " |  DRM:" + sDRMType + " | Token:" + tokenType);

            playerInstance.init(playerType, streamType, sDRMType, tokenType, previousPlayer);
            previousPlayer = playerType;
        },



        setDefaultValues: function (event) {
            // hard coding for now
            playerType = playerType === "" ? event.target[0].value : playerType
            streamType = streamType === "" ? event.target[1].value : streamType
            sDRMType = sDRMType === "" ? event.target[2].value : sDRMType
            tokenType = tokenType === "" ? event.target[3].value : tokenType
        },

        /**
         * Handle player error events.
         * 
         * @param {Event} event - The event object representing the player error.
         */
        handleError: function (event) {
            loggerInstance.log("Player error occurred: " + JSON.stringify(event.target.error));
        },

        /**
         * Release the HLS player.
         */
        releaseHlsPlayer: function () {
            if (hlsPlayer !== null) {
                loggerInstance.log("Inside release HLS method");
                return Promise.all([hlsPlayer.stopLoad(), hlsPlayer.detachMedia(), hlsPlayer.destroy()]);
            } else {
                loggerInstance.log("Rejecting HLS player release");
                return Promise.reject(" -- Rejected");
            }
        },

        /**
         * Release the Shaka player.
         */
        releaseShakaPlayer: function () {
            if (shakaPlayer !== null) {
                loggerInstance.log("Inside release Shaka method");
                return Promise.all([shakaPlayer.unload(), shakaPlayer.detach(), shakaPlayer.destroy()]);
            } else {
                return Promise.reject(" -- Rejected");
            }
        },

        /**
         * Release the current player.
         */
        releasePlayer: function () {
            loggerInstance.log("Releasing player");
            Object.keys(eventHandlerMap).forEach((event) => {
                video.removeEventListener(event, eventHandlerMap[event]);
            });
            player.src = "";
            switch (previousPlayer) {
                case "hls":
                    return releaseHlsPlayer();

                case "shaka":
                    return releaseShakaPlayer();

                default:
                    return Promise.resolve("Empty Player");
            }
        }
    };
}

export default Player;
