const Logger = function () {
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
   * @param {strategy} message - message to be logged
   */

  this.log = (message) => {
    console.log("- " + message)
    this.onScreenLog("- " + message);
  };

  /**
   * onScreenLog logs the message to the screen
   * @param {strategy} message - message to be logged
   */
  this.onScreenLog = (message) => {
    document.getElementById("logger").innerHTML += "<br>" + message;
  };

  this.clearConsole = () => {
    document.getElementById("logger").innerHTML = "<br>";
  }


};

let loggerInstance = new Logger()
export default loggerInstance;
