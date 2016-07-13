/**
 * Created by iii-user on 2016/7/7.
 */
var play = cc.Layer.extend({
    flight:null,
    fbullet:null,
    enemyGroup:[],
    bullet:[],

    ctor:function () {
        this._super();
        this.fbullet=[];
        this.enemyGroup=[];
         this.flight= new bf();
        //取得flight的x,y座標
        this.flight.x = this.flight.getPositionX();
        this.flight.y = this.flight.getPositionY();
        this.addChild(bg_2_Sprite);
        //當下this是在play內,所以this是指play
        var e= new enemy(this);
        this.addChild(this.flight);
        this.addChild(e);


        this.listen();

        //不斷更新update資料,
        this.schedule(this.update, 0.1, 16 * 1024, 1);
        return true;
    },

    listen:function () {

        if (cc.sys.capabilities.hasOwnProperty('mouse')) {
            // ({}) 內等於物件  (){} 是方法
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                        //用target才能抓到外部物件getCurrentTarget
                        cc.log(x +"," + y);
                        
                        var target = event.getCurrentTarget();
                        target.flight.stopAllActions();
                        var sp_action = cc.MoveTo.create(1, cc.p(event.getLocationX(),event.getLocationY()));
                        //制定距離抓取
                        var x = event.getLocationX();
                        var y = event.getLocationY();
                        var flightX = target.flight.x-x;
                        var flightY = target.flight.y-y;
                            var ee =flightX*flightX+flightY*flightY;
                            var ea =Math.sqrt(ee);

                        

                        cc.log("ea:"+ea);

                        var distance_1 = 100;
                        var distance_2 = 50;


                      //  var ss = new cc.Spawn(sp_action);
                        target.flight.runAction(sp_action);

                        var bullet = new cc.Sprite(res.Bullet1_png);
                        bullet.x=target.flight.x;
                        bullet.y=target.flight.y+20;
                        //已經裝進子彈到this.fbullet內了
                        target.fbullet.push(bullet);


                        var bullet_action = cc.MoveTo.create(1, cc.p(target.flight.x, 1000));
                        bullet.runAction(bullet_action);
                        target.addChild(bullet);
                       // target.flight.stopAllActions();

                    }
                }
            }, this);
        }
    },
    update:function() {
        this.flight.x = this.flight.getPositionX();
        this.flight.y = this.flight.getPositionY();
        //已經裝進子彈到this.fbullet內了



        var i ;
        var j ;
        for(i in this.fbullet){

            var bulleta = this.fbullet[i];
            var hBox = bulleta.getBoundingBox();//雷電子彈框
            for(j in EnemySprites){

                var enemy = EnemySprites[j];
                var eBox = enemy.getBoundingBox();//敵人飛機框
                if (cc.rectIntersectsRect(hBox, eBox)) {//判斷子彈與敵人是否發生碰撞
                    console.log("in__");
                    this.fbullet.splice(i, 1);//從子彈數組中刪除子彈
                    EnemySprites.splice(j, 1);
                    bulleta.removeFromParent(true);
                    enemy.removeFromParent(true);
                }
            }
        }
    }

});
var playScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new play();
        this.addChild(layer);
    }
});