//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    disabled: false
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
                url: app.globalData.url + "user/add",
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
                  wx.setStorageSync('user', result.data.userInfo)
                  console.log(result.data.userInfo)
                  if(result.data.userInfo.type == null){
                    wx.navigateTo({
                      url: '/pages/type/index',
                    })
                  }else{
                    wx.switchTab({
                      url: '/pages/home/index',
                    })
                  }
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
  onLoad: function () {
    var data = wx.getStorageSync('user')
    console.log(data)
    if (data != "") {
      if (data.type == null) {
        wx.navigateTo({
          url: '/pages/type/index',
        })
      } else {
        wx.switchTab({
          url: '/pages/home/index',
        })
      }

    }
  }
})