// pages/home/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    announcement: '',
    url: "https://s2.loli.net/",
    advertising: [],
    type: null,
    list:[],
    curNav: 1,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  getData(){
    var type = '';
    var that = this;
    if(that.data.curNav ==2){
      type = '代买'
    }else  if(that.data.curNav ==3){
      type = '代拿'
    }else  if(that.data.curNav ==4){
      type = '代办'
    }else  if(that.data.curNav ==5){
      type = '其它'
    }
    app.post("order/getList",JSON.stringify({status:'待接单',type:type}),function(res){
      that.setData({
        list: res.data
      })
    })
  },
  jd(e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    app.post("orders/save",JSON.stringify({uId:wx.getStorageSync('user').id,oId:id}),function(res){
      wx.showToast({
        title: '接单成功',
        icon:'none'
      })
      that.getData()
    })
  },
  getAnnouncement: function () {
    var that = this
    app.post("/leave/getList", null, function (res) {
      that.setData({
        announcement: res.data[0].comment
      })
    })
  },
  /* 把点击到的某一项 设为当前curNav */
  switchRightTab: function (e) {
    let id = e.target.dataset.id;
    this.setData({
      curNav: id
    })
    this.getData();
  },
  getAdvertising: function () {
    var that = this;
    app.post("/advertising/getList", null, function (res) {
      that.setData({
        advertising: res.data
      })
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
    this.setData({
      type : wx.getStorageSync('user').type
    })
    this.getAnnouncement();
    this.getAdvertising();
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