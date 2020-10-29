// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    getPmdistance(){
        var playerPos = this.canvas.pm.getPosition();
        return this.node.position.sub(playerPos).mag();
    },

    onPicked(){
        this.canvas.spawnNewStar();
        this.canvas.updateScore();
        this.node.destroy();
    },

    start () {

    },

    update (dt) {
        if (this.getPmdistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
        var opacity = 1 - this.canvas.timer/this.canvas.starD;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacity * (255 - minOpacity));
    },
});
