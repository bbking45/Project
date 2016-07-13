/**
 * Created by Administrator on 2016/7/9.
 */
var size =cc.winSize;
var _menu = 1;

//background
var bgSprite =new cc.Sprite(res.BackGround_JPG);
bgSprite.setPosition(cc.p(160,240));


//
var bg_F_Sprite = new cc.Sprite(res.flight_room_png);
bg_F_Sprite.setPosition(cc.p(160,240));

var Saturn_png = new cc.Sprite(res.Saturn_);
Saturn_png.setPosition(cc.p(160,240));


//background_playScene
var bg_2_Sprite =new cc.Sprite(res.BackGround_JPG);
bg_2_Sprite.setPosition(cc.p(160,240));



//紅翼
var bf = cc.Sprite.extend({
    ctor:function () {
        this._super(res.T1);
        this.x= GC.w_2;
        this.y=size.height/2;
        this.scale = 0.1;
    },


});

//敵機
var EnemySprites = [];
var enemy = cc.Sprite.extend({
    EnemySprites: null,
   
    ctor: function (godness) {
        this._super(res.Jet_png);
        var enemybox = godness; 
        EnemySprites = [];
        this.schedule(this.update, 1, 16 * 1024, 1);
    },
    addEnemy: function () {
        var enemy = new cc.Sprite(res.Jet_png);
        var size = cc.winSize;

        // var x = enemy.width / 2 + size.width / 2 * cc.random0To1();
        var x =  size.width * cc.random0To1();
        enemy.attr({
            x: x,
            y: size.height - 30
        });
        var dorpAction = cc.MoveTo.create(4, cc.p(enemy.x, -900));
        enemy.runAction(dorpAction);
        //要addChild進去addEnemy內

        this.addChild(enemy, 5);
        EnemySprites.push(enemy);
        
    },
    update: function () {
        this.addEnemy();
        this.removeSushi();
    },
    removeSushi: function () {
        //移除到屏幕底部的sushi
        cc.log("==============remove:" + i);

        if (EnemySprites == null) {
            for (var i = 0; i < EnemySprites.length; i++) {
                cc.log("removeSushi.........");
                if (this.EnemySprites[i].y <= 0) {
                    cc.log("==============remove:" + i);
                    this.EnemySprites[i].removeFromParent();
                    this.EnemySprites[i] = undefined;
                    //從i的位置移除掉1個
                    this.EnemySprites.splice(i, 1);
                    i = i - 1;
                }
            }
        }
    }
});