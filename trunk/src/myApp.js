/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

MyLayer = cc.Layer.extend({
    init: function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        winSize = cc.Director.getInstance().getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                history.go(-1);
            }, this);
        closeItem.setAnchorPoint(cc.p(0.5, 0.5));

        var menu = cc.Menu.create(closeItem, null);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);
        closeItem.setPosition(cc.p(winSize.width - 20, 20));

        /////////////////////////////
        // 3. add your codes below...

        var newGameNormal = cc.Sprite.create(s_Menu, cc.rect(0, 0, 126, 33));
        var newGameSelected = cc.Sprite.create(s_Menu, cc.rect(0, 33, 126, 33));
        var newGameDisabled = cc.Sprite.create(s_Menu, cc.rect(0, 33 * 2, 126, 33));

        var gameSettingsNormal = cc.Sprite.create(s_Menu, cc.rect(126, 0, 126, 33));
        var gameSettingsSelected = cc.Sprite.create(s_Menu, cc.rect(126, 33, 126, 33));
        var gameSettingsDisabled = cc.Sprite.create(s_Menu, cc.rect(126, 33 * 2, 126, 33));

        var aboutNormal = cc.Sprite.create(s_Menu, cc.rect(252, 0, 126, 33));
        var aboutSelected = cc.Sprite.create(s_Menu, cc.rect(252, 33, 126, 33));
        var aboutDisabled = cc.Sprite.create(s_Menu, cc.rect(252, 33 * 2, 126, 33));

        var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled,  this.onNewGame, this);
        var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
        var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

        var gameMenu = cc.Menu.create(newGame, gameSettings, about);
        gameMenu.alignItemsVerticallyWithPadding(10);
        this.addChild(gameMenu, 1, 2);
        gameMenu.setPosition(winSize.width / 2, winSize.height / 2 - 80);
        return true;
    },

    onNewGame:function (pSender) {
        //load resources
        cc.Loader.preload(g_ressources, function () {
            var scene = cc.Scene.create();
            scene.addChild(GameLayer.create());
            scene.addChild(GameControlMenu.create());
            scene.setAnchorPoint(cc.p(0, 0));
            scene.setPosition(cc.p(10,10));
            cc.Director.getInstance().replaceScene(scene);
        }, this);
    },

    onSettings:function (pSender) {
    },

    onAbout:function (pSender) {
    },
});

MyLayer.create = function () {
    var sg = new MyLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MyLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MyLayer.create();
    scene.addChild(layer);
    return scene;
};

