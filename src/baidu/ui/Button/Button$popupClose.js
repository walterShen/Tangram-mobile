/**
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 */

///import baidu.ui.Button;

baidu.ui.Button.register(function(me){

   me.addEventListener('onsetup', function(){
      if (me.type != 'close') {
         return;
      }
      me.parentPopup = me.findParentUI('popup');
   });

   me.addEventListener('onload', function(){
      if (me.type != 'close') {
         return;
      }
      if (!me.parentPopup) {
         return;
      }
      me.on(me.element, 'tap', function(){
         me.parentPopup.close();
      });
   });
});
