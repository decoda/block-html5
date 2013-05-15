var s_Menu = "res/menu.png";
var s_Block = "res/block.jpg";
var s_CloseNormal = "res/CloseNormal.png";
var s_CloseSelected = "res/CloseSelected.png";
var s_GameOver = "res/gameOver.png";

var g_mainmenu = [
    //image
    {src:s_Menu}
];

var g_ressources = [
    //image
    {src:s_Block},
    {src:s_CloseNormal},
    {src:s_CloseSelected},
    {src:s_GameOver}

    //plist

    //fnt

    //tmx

    //bgm

    //effect
];

var g_block_data = {
    a: [[0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]],

    b: [[0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]],

    c: [[0,0,0,0],
        [0,1,1,1],
        [0,0,1,0],
        [0,0,0,0]],

    d: [[0,1,1,0],
        [0,0,1,0],
        [0,0,1,1],
        [0,0,0,0]],

    e: [[0,1,1,0],
        [0,1,0,0],
        [1,1,0,0],
        [0,0,0,0]],

    f: [[0,1,1,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,0,0,0]],

    g: [[0,1,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,0,0]]
};

var g_block_shape = [g_block_data.a,
                     g_block_data.b,
                     g_block_data.c,
                     g_block_data.d,
                     g_block_data.e,
                     g_block_data.f,
                     g_block_data.g];