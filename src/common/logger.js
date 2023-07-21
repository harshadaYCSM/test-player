// logger.js
const Logger = function () {
    const logItems = [];
    const NUMBER_OF_CACHED_LOGS = 0; // will print mentioned+1 logs together
  
    /**
     * initializes the LOGGER
     */
    this.oldConsoleObj = null;
    this.init = (debugObj = {}) => {
      if (this.oldConsoleObj) {
        window.console = this.oldConsoleObj.console;
      }
  
      window.setInterval(() => {
        var container = document.getElementById("logger");
        container.scrollTop = container.scrollHeight;
      }, 1000);
    };
  
    /**
     * switch the logging mode based on parameters the interval
     * @param {string} logging_strategy - "all","server","onScreen"
     * @param {strategy} message - message to be logged
     */
  
    this.log = (message) => {
        console.log(" -- " + message)
      this.onScreenLog( " -- " + message);
    };
  
    /**
     * onScreenLog logs the message to the screen
     * @param {strategy} message - message to be logged
     */
    this.onScreenLog = (message) => {
      document.getElementById("logger").innerHTML += "<br>" + message;
    };
  };
  
  let loggerInstance = new Logger()
  export default loggerInstance;
  