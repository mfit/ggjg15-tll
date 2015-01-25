(function() {
'use strict';

  function makeButton(game, width, height, buttonText, spriteName) {
    spriteName = spriteName || 'button';

    // Render Texture to draw upon
    var rt = new Phaser.RenderTexture(game, width, height, spriteName);

    // Draw some graphic primitives
    var bmp = new Phaser.BitmapData(game, '', width, height);

    bmp.ctx.fillStyle = '#337711';
    bmp.circle(width/2, height/2, 10);
    bmp.ctx.fillStyle = '#137761';
    bmp.circle(width/2+10, height/2, 5);

    bmp.rect(0, 0, width, height);

    // Make Sprite / Display Object of it
    // (passing the RenderTexture instead of game - what effect does this have? )
    var spr = new Phaser.Sprite(rt, 0, 0, bmp.texture);

    // Render button text
    var txt = new Phaser.BitmapText(rt, 0, 0, 'nokia', buttonText, 24);

    // Render background and text on texture
    rt.render(spr, {x:0, y:0});
    rt.render(txt, {x:0, y:0});

    return rt;
  }

  function ButtonGraphicFactory(game) {
    this.game = game;

    return this;
  }

  ButtonGraphicFactory.prototype.createFromConfig = function(config) {
    var self = this;
    var buttons = [];
    config.forEach(function(bt) {
        buttons.push(makeButton(self.game, bt.width, bt.height, bt.text))
    });

    return buttons;
  }


  function addLineBreakToText(text, maxCharNumInLine) {
        var charArray = text.split('');
        var output = "";
        var counter = 0;
        for(var i = 0; i < charArray.length; i ++) {
          //console.log(charArray[i]);
          if(counter<maxCharNumInLine){
            output += charArray[i];
          }
          else {
            if(charArray[i] == " "){
              output += "\n";
              counter = 0;
              continue;
            }
            else
              output += charArray[i];
          }
          counter++;
        }
        return output;
      };

  module.exports = {
    makeButton:makeButton,
    ButtonGraphicFactory:ButtonGraphicFactory,
    addLineBreakToText:addLineBreakToText

  };

})();
