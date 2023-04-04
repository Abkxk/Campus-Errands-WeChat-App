// pages/order1/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '待接单',
  },
  sh(e){
    var id = e.currentTarget.dataset.id
    var money = e.currentTarget.dataset.money
    var that = this
    console.log("123")
    app.post("order/save",JSON.stringify({id:id,status:'确认收货'}),function(res){
      wx.showToast({
        title: '操作成功',
        icon:'none'
      })
      that.getData();
    })
    app.post("account/save",JSON.stringify({id:id,money:money,type:1}),function(res){
      
    })
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
    this.getData();
  },
  getData(){
    var that = this
    app.post("order/getList",JSON.stringify({uId: wx.getStorageSync('user').id,status: that.data.current}),function(res){
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