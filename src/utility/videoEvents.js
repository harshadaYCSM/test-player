import loggerInstance from "./logger";

export function onProgress(event) {
    console.log(event.type)
    // loggerInstance.log("event: " + event.type)
};

export function onErrorEvent(event) {
    try {
        loggerInstance.log("[Event] Player Error occured :" +
            event.target.error +
            "Message: " + event.target.error.message +
            "Code: " + event.target.error.code);
    } catch (error) {
        loggerInstance.log("[Event] Player Error occured ");
    }
}

export function onPlaying(event) {
    loggerInstance.log("[Event] Player Playing");
}
/**
 * Handler for video paused
 * @param {object} event - event object.
 * @event onPause - // Signal emit: on Player Pause
 */
export function onPause(event) {
    loggerInstance.log("[Event] Player Pause");
}
/**
 * Handler for video ended
 * @param {object} event - event object.
 * @event onEnded - // Signal emit: on Player Ended
 */
export function onEnded(event) {
    loggerInstance.log("[Event] Player Ended");
}
/**
 * Handler for video loading
 * @param {object} event - event object.
 * @event onloading - // Signal emit: on Player Loaded
 */
export function onloading(event) {
    loggerInstance.log("[Event] Player Loaded");
}
/**
 * Handler for video buffering for shaka
 * @param {object} event - event object.
 * @event player:onBuffering - // Signal emit: on Player Buffering
 */
export function onBuffering(event) {

    loggerInstance.log("[Event] Player Buffering " + this.isBuffering);

}
/**
 * Handler for video seeking
 * @param {object} event - event object.
 * @event onSeeking - // Signal emit: on Player Seeking
 */
export function onSeeking(event) {
    loggerInstance.log("[Event] Player Seeking");
}

/**
 * Handler for video stalled
 * @param {object} event - event object.
 * @event onStalled - // Signal emit: on Player Stalled
 */
export function onStalled(event) {
    loggerInstance.log("[Event] Player Stalled");
}
/**
 * Handler for video waiting
 * @param {object} event - event object.
 * @event onWaiting - // Signal emit: on Player Waiting
 */
export function onWaiting(event) {
    loggerInstance.log("[Event] Player Waiting ");

}

/**
 * Handler for video abort
 * @param {object} event - event object.
 * @event onAbort - // Signal emit: on abort
 */
export function onAbort(event) {
    loggerInstance.log("[Event] Player Aborted");
}

/**
 * Handler for video can play
 * @param {object} event - event object.
 * @event onCanPlay - // Signal emit: Player Can Play
 */
export function onCanPlay(event) {
    loggerInstance.log("[Event] Player Can Play");

}

/**
 * Handler for video can play through
 * @param {object} event - event object.
 * @event onCanPlayThrough - // Signal emit: Player Can Play Through
 */
export function onCanPlayThrough(event) {
    loggerInstance.log("[Event] Player Can Play Through");

}
/**
 * Handler for video duration change
 * @param {object} event - event object.
 */
export function onDurationChange(event) {
    //loggerInstance.log( "[Event] Player Video duration changed");
}
/**
 * Handler for video onEmptied
 * @param {object} event - event object.
 * @event onEmptied - // Signal emit: Player Video Emptied
 */
export function onEmptied(event) {
    loggerInstance.log("[Event] Player Video Emptied");
}
/**
 * Handler for video onLoadedMetadata
 * @param {object} event - event object.
 * @event onLoadedMetadata - // Signal emit: Player MetaData Loaded
 */
export function onLoadedMetadata(event) {
    loggerInstance.log("[Event] Player MetaData Loaded");
}
/**
 * Handler for video onLoadStart
 * @param {object} event - event object.
 * @event onLoadStart - // Signal emit: Player Load Started
 */
export function onLoadStart(event) {
    loggerInstance.log("[Event] Player Load Started");
}
/**
 * Handler for video onPlay
 * @param {object} event - event object.
 * @event onPlay - // Signal emit: Player Play
 */
export function onPlay(event) {
    loggerInstance.log("[Event] Player Play");
}
/**
 * Handler for video onRateChange
 * @param {object} event - event object.
 * @event onRateChange - // Signal emit: Player Playback speed rate Changed
 */
export function onRateChange(event) {
    loggerInstance.log("[Event] Player Playback speed rate Changed");
}
/**
 * Handler for video onSeeked
 * @param {object} event - event object.
 * @event onSeeked - // Signal emit: Player Seeked
 */
export function onSeeked(event) {
    loggerInstance.log("[Event] Player Seeked");
}
/**
 * Handler for video onSuspend
 * @param {object} event - event object.
 * @event onSuspend - // Signal emit: Player Suspended
 */
export function onSuspend(event) {
    loggerInstance.log("[Event] Player Suspended");
}
/**
 * Handler for video onTimeupdate
 * @param {object} event - event object.
 * @event onTimeupdate - // Signal emit: Player Time update
 */
export function onTimeupdate(event) {
    //loggerInstance.log( "[Event] Player Time update " + parseInt(this.onWaitingStartTime, 10) + "  " +  parseInt(event.target.currentTime, 10));
}
/**
 * Handler for video onVolumechange
 * @param {object} event - event object.
 * @event onVolumechange - // Signal emit: on volume changed
 */
export function onVolumechange(event) {
    loggerInstance.log("[Event] Player Volume Changed");
}