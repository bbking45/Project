/**
 * Created by Administrator on 2016/7/3.
 */


var Backgroundlayer = cc.Layer.extend({
    _stone1 : null,
    ctor :function (from) {
        this._super();
        
        this.addChild(bgSprite,0);
        //放這才看得到runBg讓背景有移動感
        this.runBg_1(bgSprite);
        this.addChild(Saturn_png,1);
        this.runBg_2(Saturn_png);
        this.addChild(bg_F_Sprite,3);
        
        this.initShip(2);
        cc.spriteFrameCache.addSpriteFrames(res.flight_room_png);
        
        
        //增加按鈕
        //如果from要加蝦咪的話
        if(from == _menu){
            this.addStart();
        }else {
            
        }
    },
    addStart:function () {
        var S_off = new cc.Sprite(res.start_off_png);
        var S_on = new cc.Sprite(res.start_on_png);
        S_off.attr({
            scale:0.6,
            x:150,
            y:70
        });
        S_on.attr({
            scale:0.6,
            x:150,
            y:70
        });

        //add doStart 進入第二頁
        var startmenu = new cc.MenuItemSprite(S_off,S_on,this.doStart,this);
        
        var menuHey = new cc.Menu(startmenu);
        
        //設定位置 是cc.p，160,240是中心位置
        menuHey.setPosition(cc.p(160,240));

        //按鈕圖層順序在這
        this.addChild(menuHey,5);
        
        

    },
    doStart : function () {
        cc.log("runIn");
        //最開頭動作是小寫，東西是大寫
        cc.director.pushScene(new cc.TransitionFade(0.5, new playScene()));
    },


    initShip : function(){

//       s抓取圖片放入漂浮隕石
        this._stone1 = new cc.Sprite(res.stone_1);
        this._stone2 = new cc.Sprite(res.stone_2);
        this._stone1.attr({
            scale: 0.05
        });
        this._stone2.attr({
            scale: 0.05
        });
        this.addChild(this._stone1);
        this.addChild(this._stone2);
        this._stone1.x = Math.random() * GC.w_2;
        this._stone1.y = 0;
        this._stone2.x = Math.random() * GC.w;
        this._stone2.y = 0;

//        运行一个moveBy类型的动作
        //QQQQQQ:可是如何控制速度?
        this._stone1.runAction(cc.moveBy(4, cc.p(Math.random() * GC.w_2, this._stone1.y + GC.h + 380)));
        this._stone2.runAction(cc.moveBy(4, cc.p(Math.random() * GC.w, this._stone1.y + GC.h + 380)));


//        定时器，每隔0.1秒去执行this.update()方法
        this.schedule(this.update_1, 3);
        this.schedule(this.update_2, 4);

    },
    update_1:function () {
        if (this._stone1.y > 480) {
            cc.log("in_a");
            this._stone1.x = Math.random() * GC.w;
            cc.log("in_b");
            this._stone1.y = 10;
            cc.log("in_c");
            this._stone1.runAction(cc.moveBy(
                parseInt(2 * Math.random(), 10),
                cc.p(Math.random() * GC.w, this._stone1.y + 480)

            ));
            cc.log("in_d");
        }
    },
    update_2:function () {
        if (this._stone2.y > 480) {
            this._stone2.x = Math.random() * GC.w;
            this._stone2.y = 10;
            this._stone2.runAction(cc.moveBy(
                parseInt(2 * Math.random(), 10),
                cc.p(Math.random() * GC.w, this._stone2.y + 480)

            ));
        }
    },
    runBg_1 :function (bgSprite) {
        var easeMove1 = cc.moveTo(1, cc.p(165, 233)).easing(cc.easeSineOut());
        var easeMove2 = cc.moveTo(4, cc.p(163, 210)).easing(cc.easeSineOut());
        var easeMove3 = cc.moveTo(3, cc.p(160, 190)).easing(cc.easeSineOut());
        var easeMove4 = cc.moveTo(5, cc.p(158, 230)).easing(cc.easeSineOut())
        var easeMove5 = cc.moveTo(3, cc.p(159, 240)).easing(cc.easeSineOut())
        var seqAction = cc.sequence(easeMove1, easeMove2,easeMove3,easeMove4,easeMove5);
        bgSprite.runAction(cc.repeatForever(seqAction));

    },
    runBg_2 :function (bgSprite) {
        var easeMove1 = cc.moveTo(1, cc.p(165, 233)).easing(cc.easeSineOut());
        var easeMove2 = cc.moveTo(4, cc.p(162, 200)).easing(cc.easeSineOut());
        var easeMove3 = cc.moveTo(3, cc.p(160, 180)).easing(cc.easeSineOut());
        var easeMove4 = cc.moveTo(5, cc.p(160, 240)).easing(cc.easeSineOut())
        var easeMove5 = cc.moveTo(3, cc.p(159, 245)).easing(cc.easeSineOut())
        var seqAction = cc.sequence(easeMove1, easeMove2,easeMove3,easeMove4,easeMove5);
        bgSprite.runAction(cc.repeatForever(seqAction));

    },
    

});