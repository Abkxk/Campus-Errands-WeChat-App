var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    contact: '',
    contant: ''
  },
 
  formSubmit: function (e) {
    let _that = this;
    let content = e.detail.value.opinion;
    let contact = e.detail.value.contact;
    let regPhone = /^1[3578]\d{9}$/;
    let regEmail = /^[a-z\d_\-\.]+@[a-z\d_\-]+\.[a-z\d_\-]+$/i;
    if (content == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容不能为空!',
      })
      return false
    }
    if (contact == "") {
      wx.showModal({
        title: '提示',
        content: '手机号或者邮箱不能为空!',
      })
      return false
    }
    if (contact == "" && content == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容,手机号或者邮箱不能为空!',
      })
      return false
    }
    if ((!regPhone.test(contact) && !regEmail.test(contact)) || (regPhone.test(contact) && regEmail.test(contact))) { //验证手机号或者邮箱的其中一个对
      wx.showModal({
        title: '提示',
        content: '您输入的手机号或者邮箱有误!',
      })
      return false
    } else {
      this.setData({
        loading: true
      })
     var data = {
        'content': content,
        'contact': contact
      }
      app.post("/opinion/save",JSON.stringify(data),function(res){
        _that.setData({
          loading: false,
          contact: '',
          contant: ''
        })
        wx.showToast({
          title: '反馈成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/my/my',
          })
        },1500)
      })
    }
  },
})