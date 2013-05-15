var GameOver = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var logo = cc.Sprite.create(s_GameOver);
            logo.setAnchorPoint(cc.p(0.5,0.5));
            logo.setPosition(winSize.width / 2,300);
            this.addChild(logo,10,1);

            var playAgainNormal = cc.Sprite.create(s_Menu, cc.rect(378, 0, 126, 33));
            var playAgainSelected = cc.Sprite.create(s_Menu, cc.rect(378, 33, 126, 33));
            var playAgainDisabled = cc.Sprite.create(s_Menu, cc.rect(378, 33 * 2, 126, 33));

            var playAgain = cc.MenuItemSprite.create(playAgainNormal, playAgainSelected, playAgainDisabled, this.onPlayAgain, this);
            var menu = cc.Menu.create(playAgain);
            this.addChild(menu, 1, 2);
            menu.setPosition(winSize.width / 2, 220);

            var lbScore = cc.LabelTTF.create("Your Score:"+MW.SCORE,"Arial Bold",16);
            lbScore.setPosition(winSize.width / 2,255);
            lbScore.setColor(cc.c3b(250,179,0));
            this.addChild(lbScore,10);

            bRet = true;
        }
        return bRet;
    },
    onPlayAgain:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        scene.addChild(GameControlMenu.create());
        scene.setPosition(cc.p(10,10));
        cc.Director.getInstance().replaceScene(scene);
    }
});

GameOver.create = function () {
    var sg = new GameOver();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameOver.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameOver.create();
    scene.addChild(layer);
    return scene;
};
