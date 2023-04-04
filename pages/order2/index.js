// pages/order2/index.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  getData(){
    var that = this
    app.post("order/findList",JSON.stringify({uId: wx.getStorageSync('user').id}),function(res){
      that.setData({
        list: res.data
      })
    })
  },
  upl(e){
    var id = e.currentTarget.dataset.ids
    var type = e.currentTarget.dataset.type
    var that = this
    app.post("order/save",JSON.stringify({id:id,status:type}),function(res){
      wx.showToast({
        title: '操作成功',
        icon:'none'
      })
      that.getData();
    })
  },
  del(e){
    var id = e.currentTarget.dataset.id
    var that = this
    app.post("orders/del",JSON.stringify({id:id}),function(res){
      wx.showToast({
        title: '操作成功',
        icon:'none'
      })
      that.getData();
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