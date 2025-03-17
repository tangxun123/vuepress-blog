# vue植入微信表情模块

> 在一次项目开发中，接触到客服系统，但是开发完成后，对比其他公司的客服项目发现没有植入表情功能模块
> 故此，自己就寻思着怎么实现。直接上代码。。。


1. 创一个表情组件 `emotion.vue`

```js
// emotion.vue
<template>
    <div class="emoticon-list-cover" v-show="isShow">
        <div class="emoticon-list">
            <div class="pic-item" v-for="(item,i) in emotionList" @click="clickEmoticon(i)" :key="i">
                <img :src=" 'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + i + '.gif'" :title="item" class="emotion">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props:{
        emotionIsShow:{
            type: Boolean,
            default(){
                return false;
            }
        }
    },
    data(){
      return {
        emotionList:['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭',
          '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱',
          '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘',
          '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
          '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒',
          '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹',
          '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
          '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
          '激动', '街舞', '献吻', '左太极', '右太极'],
      }
    },
    computed: {
        isShow() {
            return this.emotionIsShow;
        }
    },
    methods:{
      //选中表情
      clickEmoticon (i) {
        this.$emit('sendEmotionSelect', i);
      },
    }
  }
</script>

<style scoped>
.emoticon-list-cover {
    margin-top: 20px;
}
.emoticon-list {
    width: 380px;
    display: flex;
    flex-wrap: wrap;
}
.emotion{
    cursor: pointer;
    margin: 3px;
}
</style>
```

2. 父组件调用表情子组件

```js
// 父组件parent.vue
<template>
  <div class="hello">
    <div>
      <div class="show-input-content" contenteditable="true" @focus="iptFocus">
        <img v-for="(item, index) in divIptEmotion" :key="index" :src=" 'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + index + '.gif'" class="emotion">
      </div>
      <el-button type="primary" @click="isShow">表情</el-button>
      <el-button type="primary" @click="submit">发送</el-button>
    </div>
    <emotion :emotionIsShow="emotionIsShow" @sendEmotionSelect="getValue"></emotion>
  </div>
</template>

<script>
import emotion from "./emotion";
export default {
  components: {
    emotion
  },
  data() {
    return {
      emotionIsShow: false, // 表情面板控制出现
      divIptEmotion: [], // 接收表情组件传过来的数据
    };
  },
  methods: {
    isShow(){
      this.emotionIsShow = !this.emotionIsShow;
    },
    iptFocus(){
      this.emotionIsShow = false;
    },
    getValue(val){
      this.divIptEmotion.push(val);
    },
    submit(){
      let divIpt = document.getElementsByClassName("show-input-content")[0];
      console.log(divIpt.innerHTML)
    }
  },
};

<style scoped>
.show-input-content {
  display: inline-block;
  width: 320px;
  min-height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
}
.emotion {
  width: 22px !important;
  height: 22px !important;
  margin-right: 4px;
  line-height: 40px;
  position: relative;
  top: 5px;
}
</style>
```