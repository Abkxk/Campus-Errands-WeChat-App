var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    array: ['大一', '大二', '大三', '大四'],
  },
  onChange(event) {
    const detail = event.detail;
    this.setData({
      'user.gender': detail.value == true ? 1 : 2
    })
  },
  nickName(e) {
    this.setData({
      "user.nickName": e.detail.detail.value
    })
  },
  age(e) {
    this.setData({
      "user.age": e.detail.detail.value
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      "user.age": e.detail.value
    })
  },
  save(e) {
    var data = this.data.user;
    if (data.nickName == null || data.nickName == '') {
      wx.showToast({
        title: '请输入昵称',
        icon:'none'
      })
    } else if (data.age == null || data.age == '') {
      wx.showToast({
        title: '请输入年龄',
        icon:'none'
      })
    }else{
      var that = this;
      app.post("/user/upl",JSON.stringify(data),function(res){
        that.setData({
          user: res.data
        })
        wx.setStorageSync('user', res.data)
        console.log(res)
        wx.showToast({
          title: '保存成功',
          icon:'success'
        })
        wx.switchTab({
          url: '/pages/my/my',
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = wx.getStorageSync('user')
    var that = this
    app.post("/user/upl",JSON.stringify(data),function(res){
      that.setData({
        user: res.data
      })
    })
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

  }
})