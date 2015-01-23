

function JumpKeyboardController(controllerHandler, settings) {
  // setting keys according to settings parameter
  this.keys = {
    'left': controllerHandler.addKey(settings.left),
    'right': controllerHandler.addKey(settings.right),
    'up': controllerHandler.addKey(settings.up),
    'down': controllerHandler.addKey(settings.down),
    'jump': controllerHandler.addKey(settings.jump),
    'block': controllerHandler.addKey(settings.block),
  }
}

JumpKeyboardController.prototype = {
  getDirection: function() {
    var x=0, y=0;

    if (this.keys.right.isDown) {
      x+=1.0;
    }
    if (this.keys.left.isDown) {
      x-=1.0;
    }
    if (this.keys.down.isDown) {
      y+=1.0;
    }
    if (this.keys.up.isDown) {
      y-=1.0;
    }
    return {x:x, y:y};
  },

  getButtonA: function() {
    return this.keys.block.isDown;
  },

  getButtonBUp: function() {
    return this.keys.jump.isUp;
  },

  getButtonB: function() {
    return this.keys.jump.isDown;
  },
};


module.exports = {
  KeyboardController : JumpKeyboardController
};
