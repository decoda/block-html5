/**
 * Created with JetBrains WebStorm.
 * User: tangj
 * Date: 13-5-13
 * Time: 下午3:47
 * To change this template use File | Settings | File Templates.
 */

var TAG_SPRITE_BATCH_NODE = 1;
var BLOCK_SIZE = 48;
var CELL_WIDTH = 18;
var CELL_HEIGHT = 9;
var INIT_POSX = -2 * BLOCK_SIZE;
var INIT_POSY = 3* BLOCK_SIZE;

GameLayer = cc.Layer.extend({
    _shape: 0,
    _aryBlock: null,
    _aryBlockData: null,
    _posX: INIT_POSX,
    _posY: INIT_POSY,
    _speed: 1,

    init: function () {
        var batchNode = cc.SpriteBatchNode.create(s_Block, 144);
        this.addChild(batchNode, 0, TAG_SPRITE_BATCH_NODE);
        this._aryBlock = g_block_shape[this._shape];
        this._aryBlockData = this.newArray(CELL_WIDTH, CELL_HEIGHT);

        MW.SCORE = 0;

        this.setKeyboardEnabled(true);
        this.schedule(this.update);

        return true;
    },

    newArray: function (row, column) {
        var ary = new Array();
        for (var i = 0; i < row; ++i) {
            ary[i] = new Array();
            for (var j = 0; j < column; ++j) {
                ary[i][j] = 0;
            }
        }
        return ary;
    },

    update: function (dt) {
        for (var i = 1; i <= this._speed; ++i) {
            var posX = this._posX + 1;
            // 是否碰到
            if (!this.boundCheck(posX, this._posY)) {
                this.setBlockData();
                this.drawBackground();
                this.changeShape(0);
                this._posX = INIT_POSX;
                this._posY = INIT_POSY;
                for (var j = 0; j < 4; ++j) {
                    if (!this.boundCheck(this._posX, this._posY)) {
                        this.roateShape(0);
                    } else {
                        break;
                    }
                }
                if (j == 4) {
                    this._speed = 0;
                    this.onGameOver();
                }
            } else {
                this._posX = posX;
            }
        }
        this.drawBlock();
    },

    onKeyUp: function (e) {
        if (e == cc.KEY.right) {
            if (this._speed != 0) {
                this._speed = 1;
            }
        }
    },

    onKeyDown: function (e) {
        if (e == cc.KEY.up) {
            var posY = this._posY + BLOCK_SIZE;
            if (this.boundCheck(this._posX, posY)) {
                this._posY = posY;
            }
        }
        else if (e == cc.KEY.down) {
            var posY = this._posY - BLOCK_SIZE;
            if (this.boundCheck(this._posX, posY)) {
                this._posY = posY;
            }
        }
        else if (e == cc.KEY.left) {
            var aryBlock = this._aryBlock;
            this.roateShape(0);
            if (!this.boundCheck(this._posX, this._posY)) {
                this._aryBlock = aryBlock;
            }
        }
        else if (e == cc.KEY.right) {
            if (this._speed != 0) {
                this._speed = 8;
            }
        }
    },

    drawBlock: function () {
        var batchNode = this.getChildByTag(TAG_SPRITE_BATCH_NODE);
        var texture = batchNode.getTexture();
        var rt = cc.rect(0, 0, BLOCK_SIZE, BLOCK_SIZE);
        var tagIndex = 0;
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                batchNode.removeChild(batchNode.getChildByTag(++tagIndex));
                if (this._aryBlock[i][j] != 0) {
                    var sprite = cc.Sprite.createWithTexture(texture, rt);
                    sprite.setAnchorPoint(cc.p(0, 0));
                    sprite.setPosition(cc.p(j * BLOCK_SIZE + this._posX, (4 - 1 - i) * BLOCK_SIZE + this._posY));
                    batchNode.addChild(sprite, 0, tagIndex);
                }
            }
        }
    },

    drawBackground: function () {
        var batchNode = this.getChildByTag(TAG_SPRITE_BATCH_NODE);
        var texture = batchNode.getTexture();
        var rt = cc.rect(0, 0, BLOCK_SIZE, BLOCK_SIZE);
        var tagIndex = 100;
        for (var i = 0; i < CELL_WIDTH; ++i) {
            for (var j = 0; j < CELL_HEIGHT; ++j) {
                batchNode.removeChild(batchNode.getChildByTag(++tagIndex));
                if (this._aryBlockData[i][j] != 0) {
                    var sprite = cc.Sprite.createWithTexture(texture, rt);
                    sprite.setAnchorPoint(cc.p(0, 0));
                    sprite.setPosition(cc.p(i * BLOCK_SIZE+INIT_POSX, j * BLOCK_SIZE));
                    batchNode.addChild(sprite, 0, tagIndex);
                }
            }
        }
    },

    roateShape: function (dir) {
        var aryBlockShape = new Array(4);
        for (var i = 0; i < 4; ++i) {
            aryBlockShape[i] = new Array(4);
            for (var j = 0; j < 4; ++j) {
                if (dir == 0) {
                    aryBlockShape[i][j] = this._aryBlock[4 - 1 - j][i];
                }
                else if (dir == 1) {
                    aryBlockShape[i][j] = this._aryBlock[j][4 - 1 - i];
                }
            }
        }
        this._aryBlock = aryBlockShape;
    },

    changeShape: function (dir) {
        if (dir == 0) {
            this._shape++;
            if (this._shape == g_block_shape.length) {
                this._shape = 0;
            }
        }
        else if (dir == 1) {
            this._shape--;
            if (this._shape < 0) {
                this._shape = g_block_shape.length - 1;
            }
        }
        this._aryBlock = g_block_shape[this._shape];
    },

    boundCheck: function (posX, posY) {
        var x = Math.floor((posX-INIT_POSX) / BLOCK_SIZE);
        var y = Math.floor(posY / BLOCK_SIZE);
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                if (this._aryBlock[i][j] != 0) {
                    var x1 = x + 1 + j;
                    if (x1 < 0 || x1 >= CELL_WIDTH) {
                        return false;
                    }
                    var y1 = y + 4 - 1 - i;
                    if (y1 < 0 || y1 >= CELL_HEIGHT) {
                        return false;
                    }
                    if (this._aryBlockData[x1][y1] != 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    },

    setBlockData: function () {
        var x = Math.floor((this._posX-INIT_POSX) / BLOCK_SIZE);
        var y = Math.floor(this._posY / BLOCK_SIZE);
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                if (this._aryBlock[i][j] != 0) {
                    var x1 = x + 1 + j;
                    if (x1 < 0 || x1 >= CELL_WIDTH) {
                        continue;
                    }
                    var y1 = y + 4 - 1 - i;
                    if (y1 < 0 || y1 >= CELL_HEIGHT) {
                        continue;
                    }
                    this._aryBlockData[x1][y1] = 1;
                }
            }
        }
        // 消层
        var ary = this.newArray(CELL_HEIGHT, CELL_WIDTH);
        var index = CELL_WIDTH - 1;
        for (var i = CELL_WIDTH - 1; i >= 0; --i) {
            for (var j = CELL_HEIGHT - 1; j >= 0; --j) {
                if (this._aryBlockData[i][j] != 1) {
                    ary[index--] = this._aryBlockData[i];
                    break;
                }
            }
        }
        MW.SCORE += index + 1;
        this._aryBlockData = ary;
    },

    onGameOver:function () {
        var scene = cc.Scene.create();
        scene.addChild(GameOver.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};