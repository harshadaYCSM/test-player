export const init = (playerType, streamType, sDRMType, tokenType) => {
    console.log("Initiating player", playerType, streamType, sDRMType, tokenType)
    if (playerType === "hls" && streamType === "hls") {
        if (sDRMType === "none") {
            //
        } else if (sDRMType === "aes") {
            //
        }
    }
}
