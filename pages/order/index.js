// pages/order/index.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  add:function(){
    wx.navigateTo({
      url: '/pages/addOrder/index',
    })
  },
  del(e){
    var that = this
    var id = e.currentTarget.dataset.id
    app.post("order/del",JSON.stringify({id:id}),function(res){
      wx.showToast({
        title: '删除完成',
        icon: 'none'
      })
      that.getData();
    })
  },
  getData(){
    var that = this
    app.post("order/getList",JSON.stringify({uId: wx.getStorageSync('user').id}),function(res){
      that.setData({
        list: res.data
      })
      console.log(res.data)
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
    this.getData();
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