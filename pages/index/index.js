//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    on:true,
    play:false,
    motto: 'Hello World',
    animation: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },  

  g(){
    var animation = wx.createAnimation({})
    animation.rotate(360).step({duration:1000})
    this.setData({ animation: animation.export()})
    setTimeout(function() {
      // 逆时针旋转至0度
      animation.rotate(0 ).step()
      
     this.setData({
       animation: animation.export()
     })
    }.bind(this),1200);
    setTimeout(function() {
      wx.showToast({
        title: '数据获取成功！', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 1500  // 提示窗停留时间，默认1500ms
      })
    }.bind(this),2200);
    
  }
})
