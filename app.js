//app.js
App({
/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    // 3秒模拟数据加载
    // 不加这个方法真机下拉会一直处于刷新状态，无法复位
    setTimeout(function() {
    wx.stopPullDownRefresh()
     }.bind(this),2200);
  },
  globalData:{
    userInfo:null
  },


})