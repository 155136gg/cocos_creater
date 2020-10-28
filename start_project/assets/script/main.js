// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab:{
            default: null,
            type: cc.Prefab
        },
        maxD:0,
        minD:0,

        ground:{
            default:null,
            type: cc.Node
        },

        pm:{
            default:null,
            type: cc.Node
        },

        score:{
            default:0,
            displayName:"Score",
            tooltips:"player score"
        }
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

    onLoad () {
        this.groundY = this.ground.y + this.ground.height/2;
        // 生成一个新的星星
        this.spawnNewStar();
    },

    spawnNewStar(){
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
    },

    getNewStarPosition(){
        var randX = (Math.random() - 0.5) * 2 * this.node.width/2;
        var randY = this.groundY + Math.random() * this.pm.getComponent('pm').jumpH + 50;
        return cc.v2(randX,randY);
    },

    start () {

    },

    // update (dt) {},
});
