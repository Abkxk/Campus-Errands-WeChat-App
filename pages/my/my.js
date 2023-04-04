// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    hidden: true,
    type:null,
    money: null,
    visible1:false,
    visible: false,
    bz_title: "",
    map: null
  },
  bb(){
    this.setData({
      visible1: true
    })
    console.log("123")
  },
  handleClose1(){
    this.setData({
      visible1: false
    })
  },
  pay(){
    var that = this
    if(that.data.money == null || that.data.money < 1){
      wx.showToast({
        title: '当前无金额可提现',
        icon: 'none'
      })
      return ;
    }
    app.post("account/upl1",JSON.stringify({uId: wx.getStorageSync('user').id,money: that.data.money}),function(res){
      wx.showToast({
        title: '提现完成',
        icon: 'none'
      })
      that.setData({
        visible1: false,
        money: null
      })
      that.money();
    })
  },
  mon(e){
    var money = e.detail.value
    if(Number(money) > Number(this.data.map.money1)){
      this.setData({
        money : this.data.map.money1
      })
    }
  },
  money(){
    var that = this;
    app.post("account/getList",JSON.stringify({uId:wx.getStorageSync('user').id}),function(res){
      console.log(res)
      that.setData({
        map:res.data[0]
      })
    })
  },
  phone:function(){
    wx.showModal({
      title: '温馨提示',
      content: '客服电话: 10086',
      showCancel: false
    })
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      wx.login({
        success: function (res) {
          that.setData({
            hidden: false
          })
          wx.getUserInfo({
            lang: "zh_CN",
            success: function (userRes) {
              //发起网络请求
              wx.request({
                url: app.globalData.url + "/user/add",
                data: {
                  code: res.code,
                  encryptedData: userRes.encryptedData,
                  iv: userRes.iv
                },
                header: {
                  "Content-Type": "application/json"
                },
                method: 'GET',
                //服务端的回掉
                success: function (result) {

                  var data = result.data.userInfo;
                  wx.setStorageSync("user", data);
                  wx.switchTab({
                    url: '/pages/my/my'
                  })
                  that.setData({
                    user: data,
                    hidden: true
                  })
                }
              })
            },
            fail: function () {
              that.setData({
                hidden: true
              })
            }
          })
        }
      });
    } else {
      var that = this;
      that.setData({
        hidden: true
      })
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + 'user/userInfo',
      data: {
        openid: wx.getStorageSync("user").openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if(res.data != ""){
        that.setData({
          user: res.data,
          hidden: true
        })
      }
      },fail:function(e){
        console.log(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.money();

    var that = this;
    that.setData({
      hidden: false,
      type:wx.getStorageSync('user').type
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/my/my'
              })
              that.setData({
                hidden: true
              })
            }
          });
        }
      }
    })
    that.setData({
      hidden: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  dropOut: function () {
    var that = this;
    wx.removeStorageSync("user");
    that.setData({
      user: null,
      hidden: true
    })
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})