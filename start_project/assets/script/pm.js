// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jumpH:0,
        jumpD:0,
        maxS:0,
        acc:0
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    jump(){
        var up = cc.tween().by(this.jumpD,{y:this.jumpH}, {easing:'signOut'});
        var down = cc.tween().by(this.jumpD,{y:-this.jumpH}, {easing:'signIn'});
        return cc.tween().sequence(up,down).repeatForever();
    },
    // LIFE-CYCLE CALLBACKS:

    keyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },
    keyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },

    onLoad () {
        this.accLeft = false;
        this.accRight = false;
        this.xS = 0;

        cc.tween(this.node).then(this.jump()).start();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
    },

    start () {

    },

    update (dt) {
        if (this.accLeft) {
            this.xS -= this.acc * dt;
        }
        else if (this.accRight) {
            this.xS += this.acc * dt;
        }

        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xS) > this.maxS) {
            // if speed reach limit, use max speed with current direction
            this.xS = this.maxS * this.xS / Math.abs(this.xS);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xS * dt;
    },
});
