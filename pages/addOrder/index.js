// pages/addOrder/index.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['代买', '代拿', '代办', '其它'],
    index: 0,
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  submit:function(e){
    var param = e.detail.value;
    if (param["ms"]==''){
      wx.showToast({
        title: '请输入您的需求',
        icon:'none'
      })
    }else if(param["money"]==''){
      wx.showToast({
        title: '请输入您的价格',
        icon:'none'
      })
    }else{
      param["status"] = '待接单'
      param["uId"] = wx.getStorageSync('user').id
      app.post("order/save",JSON.stringify(param),function(res){
        wx.showToast({
          title: '发布成功',
          icon:'none'
        })
        wx.navigateBack({
          delta: 0,
        })
      })
    }

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