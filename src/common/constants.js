
import * as videoEvents from "../utility/videoEvents";

export const tokens = {
    "wideVineToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.4lWwW46k-oWcah8oN18LPj5OLS5ZU-_AQv7fe0JhNjA",
    "playReadyToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiNjllNTQwODgtZTllMC00NTMwLThjMWEtMWViNmRjZDBkMTRlIiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiMTUzMGQzYTAtNjkwNC00NDZhLTkxYTEtMzNhMTE1YWE4YzQxIn0seyJpZCI6ImM4M2ViNjM5LWU2NjQtNDNmOC1hZTk4LTQwMzliMGMxM2IyZCJ9LHsiaWQiOiIzZDhjYzc2Mi0yN2FjLTQwMGYtOTg5Zi04YWI1ZGM3ZDc3NzUifSx7ImlkIjoiYmQ4ZGFkNTgtMDMyZC00YzI1LTg5ZmEtYzdiNzEwZTgyYWMyIn1dfX0.9t18lFmZFVHMzpoZxYDyqOS0Bk_evGhTBw_F2JnAK2k"

}

export const eventHandlerMap = {
    'playing': videoEvents.onPlaying,
    'pause': videoEvents.onPause,
    'ended': videoEvents.onEnded,
    'loading': videoEvents.onloading,
    'seeking': videoEvents.onSeeking,
    'stalled': videoEvents.onStalled,
    'waiting': videoEvents.onWaiting,
    'progress': videoEvents.onProgress,
    'abort': videoEvents.onAbort,
    'canplay': videoEvents.onCanPlay,
    'canplaythrough': videoEvents.onCanPlayThrough,
    'durationchange': videoEvents.onDurationChange,
    'emptied': videoEvents.onEmptied,
    'error': videoEvents.onErrorEvent,
    'loadedmetadata': videoEvents.onLoadedMetadata,
    'loadstart': videoEvents.onLoadStart,
    'play': videoEvents.onPlay,
    'ratechange': videoEvents.onRateChange,
    'seeked': videoEvents.onSeeked,
    'suspend': videoEvents.onSuspend,
    'timeupdate': videoEvents.onTimeupdate,
    'volumechange': videoEvents.onVolumechange,
};
