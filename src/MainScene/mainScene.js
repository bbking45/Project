/**
 * Created by Administrator on 2016/7/3.
 */
//給你看的
var MainMenuLayer = cc.Layer.extend({
    _backgroundLayer :null,
    _touchLayer :null,

    ctor:function () {
        this._super();
        this.addBackgroundlayer();
    },
    addBackgroundlayer :function () {
        //如此一來就會傳1 ，寫在ctor內的話就不用在點（dot)了
        this._backgroundLayer = new Backgroundlayer(_menu);
        //其他名稱不會自動執行的,就需要dot一下
        this._backgroundLayer.init();
        this.addChild(this._backgroundLayer);
    }

    // addtouchlayer : function () {
    //     this._touchLayer = new MMTouchlayer();
    //     this.addChild(this._touchLayer);
    // }

});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});