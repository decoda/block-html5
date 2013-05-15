/**
 * Created with JetBrains WebStorm.
 * User: tangj
 * Date: 13-5-13
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */

var GameControlMenu = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            cc.MenuItemFont.setFontSize(18);
            cc.MenuItemFont.setFontName("Arial");
            var systemMenu = cc.MenuItemFont.create("Main Menu", this.onSysMenu);
            var menu = cc.Menu.create(systemMenu);
            menu.setPosition(0, 0);
            systemMenu.setAnchorPoint(cc.p(0, 0));
            systemMenu.setPosition(winSize.width-115, 5);
            this.addChild(menu, 1, 2);
            bRet = true;
        }

        return bRet;
    },
    onSysMenu:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(MyLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,scene));
    }
});

GameControlMenu.create = function () {
    var sg = new GameControlMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};