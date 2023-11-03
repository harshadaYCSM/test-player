import loggerInstance from "./logger";
/**
 * Calculate video progress percentage
 * @param {string} options - options to the obeject.
 * @event onProgress - // Signal emit: on player progress
 */
export function onProgress(event) {
    this.errorCounter = 0;
    /* if(this.setTimeoutOnWaiting){
        loggerInstance.log(this.MODULE_NAME,"Clearing timeout");
        clearTimeout(this.setTimeoutOnWaiting);
        this.setTimeoutOnWaiting = null;
    } */
    // Signal.emit('onProgress', { video: event.target });
};
/**
 * pass the video error details to concerned functions
 * @param {object} error - error object.
 * @event onErrorEvent - // Signal emit: on Player Error occured for videoTag
 */
export function onErrorEvent(event) {
    try {
        loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Error occured " + event.target.error + event.target.error.message);
    } catch (error) {
        loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Error occured ");
    }

    //this.onError(event);
    this.currentTimeForNative = event.srcElement.currentTime;
    // Signal.emit('onErrorEvent', { video: event.target });
}

/**
  * Handler for video play
  * @param {object} event - event object.
  * @event onPlaying - // Signal emit: on Player Playing
  */
export function onPlaying(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Playing");
    // Signal.emit('onPlaying', { video: event.target });
}
/**
 * Handler for video paused
 * @param {object} event - event object.
 * @event onPause - // Signal emit: on Player Pause
 */
export function onPause(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Pause");
    // Signal.emit('onPause', { video: event.target });
}
/**
 * Handler for video ended
 * @param {object} event - event object.
 * @event onEnded - // Signal emit: on Player Ended
 */
export function onEnded(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Ended");
    // Signal.emit('onEnded', { video: event.target });
}
/**
 * Handler for video loading
 * @param {object} event - event object.
 * @event onloading - // Signal emit: on Player Loaded
 */
export function onloading(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Loaded");
    // Signal.emit('onloading', { video: event.target });
}
/**
 * Handler for video buffering for shaka
 * @param {object} event - event object.
 * @event player:onBuffering - // Signal emit: on Player Buffering
 */
export function onBuffering(event) {
    this.isBuffering = event.buffering;
    this.onWaitingStartTime = this.nativePlayer.currentTime;
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Buffering " + this.isBuffering);
    if (this.isBuffering) {
        //this.checkLowNetwork();
        // Signal.emit('player:onBuffering', { video: event.target });
        this.checkInternetConnectivity();
    } else {
        loggerInstance.log(this.MODULE_NAME, "Clearing timeout onBuffering");
        clearTimeout(this.setTimeoutOnWaiting);
        this.setTimeoutOnWaiting = null;
    }
    if (this.features.ENABLE_BUFFERING_PERCANTAGE) {
        this.showShakaBufferPercentage("onBuffering");
    } else {
        loggerInstance.log(this.MODULE_NAME, "buffer percent feature is disabled in features");
    }
}
/**
 * Handler for video seeking
 * @param {object} event - event object.
 * @event onSeeking - // Signal emit: on Player Seeking
 */
export function onSeeking(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Seeking");
    if (this.setTimeoutOnWaiting) {
        // loggerInstance.log(this.MODULE_NAME,"Clearing timeout");
        // clearTimeout(this.setTimeoutOnWaiting);
        // this.setTimeoutOnWaiting = null;
        this.checkInternetConnectivity();
    }
    // Signal.emit('onSeeking', { video: event.target });
}

/**
 * Handler for video stalled
 * @param {object} event - event object.
 * @event onStalled - // Signal emit: on Player Stalled
 */
export function onStalled(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Stalled");
    // Signal.emit('onStalled', { video: event.target });
    this.onWaitingStartTime = event.target.currentTime;
    if (window.PRODUCT === "sam") {
        if (this.setTimeoutOnWaiting) {
            loggerInstance.log(this.MODULE_NAME, "Clearing timeout");
            clearTimeout(this.setTimeoutOnWaiting);
            this.setTimeoutOnWaiting = null;
        }
    } else {
        this.checkInternetConnectivity();
    }
}
/**
 * Handler for video waiting
 * @param {object} event - event object.
 * @event onWaiting - // Signal emit: on Player Waiting
 */
export function onWaiting(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Waiting ");
    this.isBuffering = true;
    this.bufferedPercent = 0;
    this.onWaitingStartTime = event.target.currentTime;
    this.checkInternetConnectivity();
    if (this.features.ENABLE_BUFFERING_PERCANTAGE) {
        this.showNativeBufferPercentage("onWaiting");
    } else {
        loggerInstance.log(this.MODULE_NAME, "buffer percent feature is disabled in features");
    }
    // Signal.emit('onWaiting', { video: event.target });
    // Signal.emit('player:onBuffering', { video: event.target });
}

/**
 * Handler for video abort
 * @param {object} event - event object.
 * @event onAbort - // Signal emit: on abort
 */
export function onAbort(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Aborted");
    // Signal.emit('onAbort', { video: event.target });
}

/**
 * Handler for video can play
 * @param {object} event - event object.
 * @event onCanPlay - // Signal emit: Player Can Play
 */
export function onCanPlay(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Can Play");
    this.isBuffering = false;
    if (this.features.ENABLE_BUFFERING_PERCANTAGE) {
        this.showNativeBufferPercentage("onCanPlay");
    } else {
        loggerInstance.log(this.MODULE_NAME, "buffer percent feature is disabled in features");
    }
    // Signal.emit('onCanPlay', { video: event.target });
}

/**
 * Handler for video can play through
 * @param {object} event - event object.
 * @event onCanPlayThrough - // Signal emit: Player Can Play Through
 */
export function onCanPlayThrough(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Can Play Through");
    this.isBuffering = false;
    if (this.features.ENABLE_BUFFERING_PERCANTAGE) {
        this.showNativeBufferPercentage("onCanPlayThrough");
    } else {
        loggerInstance.log(this.MODULE_NAME, "buffer percent feature is disabled in features");
    }
    // Signal.emit('onCanPlayThrough', { video: event.target });
}
/**
 * Handler for video duration change
 * @param {object} event - event object.
 */
export function onDurationChange(event) {
    //loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Video duration changed");
    // Signal.emit('onCanPlayThrough', { video: event.target });
}
/**
 * Handler for video onEmptied
 * @param {object} event - event object.
 * @event onEmptied - // Signal emit: Player Video Emptied
 */
export function onEmptied(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Video Emptied");
    // Signal.emit('onEmptied', { video: event.target });
}
/**
 * Handler for video onLoadedMetadata
 * @param {object} event - event object.
 * @event onLoadedMetadata - // Signal emit: Player MetaData Loaded
 */
export function onLoadedMetadata(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player MetaData Loaded");
    // Signal.emit('onLoadedMetadata', { video: event.target });
}
/**
 * Handler for video onLoadStart
 * @param {object} event - event object.
 * @event onLoadStart - // Signal emit: Player Load Started
 */
export function onLoadStart(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Load Started");
    // Signal.emit('onLoadStart', { video: event.target });
}
/**
 * Handler for video onPlay
 * @param {object} event - event object.
 * @event onPlay - // Signal emit: Player Play
 */
export function onPlay(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Play");
    // Signal.emit('onPlay', { video: event.target });
}
/**
 * Handler for video onRateChange
 * @param {object} event - event object.
 * @event onRateChange - // Signal emit: Player Playback speed rate Changed
 */
export function onRateChange(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Playback speed rate Changed");
    // Signal.emit('onRateChange', { video: event.target });
}
/**
 * Handler for video onSeeked
 * @param {object} event - event object.
 * @event onSeeked - // Signal emit: Player Seeked
 */
export function onSeeked(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Seeked");
    // Signal.emit('onSeeked', { video: event.target });
}
/**
 * Handler for video onSuspend
 * @param {object} event - event object.
 * @event onSuspend - // Signal emit: Player Suspended
 */
export function onSuspend(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Suspended");
    this.onWaitingStartTime = event.target.currentTime;
    this.checkInternetConnectivity();
    // Signal.emit('onSuspend', { video: event.target });
}
/**
 * Handler for video onTimeupdate
 * @param {object} event - event object.
 * @event onTimeupdate - // Signal emit: Player Time update
 */
export function onTimeupdate(event) {
    //loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Time update " + parseInt(this.onWaitingStartTime, 10) + "  " +  parseInt(event.target.currentTime, 10));
    let isGreater = event.target.currentTime - this.onWaitingStartTime > 1;
    if (this.onWaitingStartTime != undefined && isGreater && this.setTimeoutOnWaiting) {
        loggerInstance.log(this.MODULE_NAME, "Clearing timeout onTimeUpdate");
        loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Time update " + this.onWaitingStartTime + "  " + event.target.currentTime);
        clearTimeout(this.setTimeoutOnWaiting);
        this.setTimeoutOnWaiting = null;
    }
    // Signal.emit('onTimeupdate', { video: event.target });
}
/**
 * Handler for video onVolumechange
 * @param {object} event - event object.
 * @event onVolumechange - // Signal emit: on volume changed
 */
export function onVolumechange(event) {
    loggerInstance.log(this.MODULE_NAME, "[ztvlib] Player Volume Changed");
    // Signal.emit('onVolumechange', { video: event.target });
}