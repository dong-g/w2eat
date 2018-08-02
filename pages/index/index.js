//index.js
//获取应用实例
const app = getApp();
var orifoodList = [
  '麻辣烫',
  '沙拉',
  '凉皮&肉夹馍',
  '冒菜',
  '火锅',
  '鸡公煲',
  '酸菜鱼',
  '麻辣鱼',
  '烤鸭',
  '水煮肉',
  '臊子面',
  '油泼面',
  '糖醋排骨'
];
var getRandomFood = function(foodList){
  var foodLength = foodList.length;
  if (foodLength == 0) {
    return '吃屎';
  }
  else {
    var index = Math.floor((Math.random() * foodLength));
    var food = foodList[index];
    return food;
  }
};

Page({
  data: {
    motto: '? 今天吃什么呢 ?',
    buttonText: '随缘',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isStart: false,
    isEnd: false,
    foodList: orifoodList,
    randomTimes: 0,
    food: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onHide: function(){
    console.log("hide");
    this.setData({
      buttonText: '随缘',
      isStart: false,
      isEnd: false,
      foodList: foodList,
      randomTimes: 0,
      food: ""
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  startEat: function(){
    this.data.randomTimes++;
    var food = getRandomFood(this.data.foodList);
    var index = this.data.foodList.indexOf(food);
    if (this.data.randomTimes <= 10 && index>=0){
      this.data.foodList.splice(index, 1);
      this.setData({
        isStart: true,
        food: food
      });
    }
    else{
      this.setData({
        isEnd: true,
        buttonText:'吃屎'
      })
    }
  }
})
