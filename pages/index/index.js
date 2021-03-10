//index.js
//获取应用实例
const app = getApp()
var Data=[]
Page({
  data: {
    /**
        * 页面配置
        */
       winWidth: 0,
       winHeight: 0,
       // tab切换
       currentTab: 0,
       update_time:" ",
       city:" ",
       week:" ",
       week2:" ",
       week3:" ",
       week1wea:" ",
       week1wea_img:" ",
       week1tem1:" ",
       week1tem2:" ",
       week2wea:" ",
       week2wea_img:" ",
       week2tem1:" ",
       week2tem2:" ",
       week3wea:" ",
       week3wea_img:" ",
       week3tem1:" ",
       week3tem2:" ",
       wea_img: " ",
       wea: " ",
       tem:" ",
       tem1:" ",
       tem2:" ",
       win:" ",
       humidity:" ",
       pressure:" ",
       visibility:" ",
       win_meter:" ",
       air_level:" ",
       air:" ",
       air_pm25:" ",
       text: " ",
       marqueePace: 20,//滚动速度
       marqueeDistance: 0,//初始滚动距离
       marquee_margin: 30,
       size:14,
       interval:10,// 时间间隔
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
  onLoad: function() {
    var that = this;
 
    /**
     * 获取系统信息
     */
    wx.getSystemInfo( {
 
      success: function( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    this.get()
    this.get2()
  },
  /**
     * 滑动切换tab
     */
  bindChange: function( e ) {
 
    var that = this;
    that.setData( { currentTab: e.detail.current });
 
  },
  /**
   * 点击tab切换
   */
  swichNav: function( e ) {
 
    var that = this;
 
    if( this.data.currentTab === e.target.dataset.current ) {
      return false;
    } else {
      that.setData( {
        currentTab: e.target.dataset.current
      })
    }
  },
  g(){
    var animation = wx.createAnimation({})
    animation.rotate(360).step({duration:500})
    this.setData({ animation: animation.export()})
    setTimeout(function() {
      // 逆时针旋转至0度
      animation.rotate(0 ).step()
     this.setData({
       animation: animation.export()
     })
    }.bind(this),1200);
    setTimeout(function() {
      this.get()
      this.get2()
      wx.showToast({
        title: '数据获取成功！', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 1500  // 提示窗停留时间，默认1500ms
      })
    }.bind(this),2200);
    
  },
  get(){
    var that = this
    wx.request({
      url: 'https://tianqiapi.com/api?version=v6&appid=88347648&appsecret=aHZ2W4pE', 
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        var data=res.data
        console.log(data)
        that.setData({
           city:data.city,
           update_time:data.update_time,
           wea: data.wea,
           win:data.win,
           humidity:data.humidity,
           pressure:data.pressure,
           visibility:data.visibility,
           win_meter:data.win_meter,
           wea_img:data.wea_img,
           week:data.week,
           tem:data.tem,
           tem1:data.tem1,
           tem2:data.tem2,
           air_level:data.air_level,
           air:data.air,
           air_pm25:data. air_pm25,
           text:data.air_tips,
        })
        console.log(that.data.city)
      }
    })
  },
  get2(){
    var that = this
    wx.request({
      url: 'https://tianqiapi.com/api?version=v1&appid=88347648&appsecret=aHZ2W4pE', 
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        var data=res.data.data
        console.log(data)
        that.setData({
        week2:data[2].week,
        week3:data[3].week,
        week1wea:data[1].wea,
        week2wea:data[2].wea,
        week3wea:data[2].wea,
        week1wea_img:data[1].wea_img,
        week1tem1:data[1].tem1,
        week1tem2:data[1].tem2,
        week2wea_img:data[2].wea_img,
        week2tem1:data[2].tem1,
        week2tem2:data[2].tem2,
        week3wea_img:data[3].wea_img,
        week3tem1:data[3].tem1,
        week3tem2:data[3].tem2,
       })
       console.log(that.data.city)
     }
    })
  },
  onShow: function () {
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt();// 第一个字消失后立即从右边出现
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    // 3秒模拟数据加载
    // 不加这个方法真机下拉会一直处于刷新状态，无法复位
    setTimeout(function() {
      wx.stopPullDownRefresh()
      this.get()
      this.get2()
      wx.showToast({
        title: '数据获取成功！', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 1500  // 提示窗停留时间，默认1500ms
      })
    }.bind(this),2200);

  },
  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth){
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }
        else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    }
    else{
      that.setData({ marquee_margin:"1000"});//只显示一条不滚动右边间距加大，防止重复显示
    } 
  }

})
