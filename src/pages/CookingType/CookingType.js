// pages/CookingType/CookingType.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiaddress: getApp().globalData.apiaddress,
    imgaddress: getApp().globalData.imgaddress,
    title: '',
    count: 0,
    totalPrice: 0,
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      title: options.id
    });

    //对应每个类别内所有商品
    wx.request({
      url: getApp().globalData.apiaddress + 'WebChatData/GetAllInventoryListById/' + options.id,
      success: function(res) {
        that.setData({
          dataList: res.data
        })
      }
    })
  },

  //选中商品并添加到购物车内
  // changed: function(e) {
  //   wx.request({
  //     url: getApp().globalData.apiaddress + 'ShoppingCar/AddShoppingCar',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     method: 'GET',
  //     data: {
  //       id: e.detail.value[0],
  //       user: 'admin'
  //     },
  //     success: function(res) {}
  //   });
  // },

  //全选
  checkAll: function(e) {
    var checked = e.detail.value;
    var dataList = this.data.dataList;
    for (var i = 0; i < dataList.length; i++) {
      dataList[i].checked = checked;
    }
    this.setData({
      dataList: dataList
    });
    this.calcateTotal();
  },

  //计算选择数量
  calcateTotal: function() {
    var total = 0;
    var price = 0;
    var dataList = this.data.dataList;
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].checked) {
        total += 1;
        price += dataList[i]._Price;
      }
    }
    this.setData({
      count: total,
      totalPrice: price
    })
  },

  //单个选择
  checkItem: function(e) {
    var id = e.target.dataset.id;
    var checked = e.detail.value;
    var dataList = this.data.dataList;
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i]._ID == id) {
        dataList[i].checked = checked;
        break;
      }
    };
    this.setData({
      dataList: dataList
    });
    this.calcateTotal();

  },

  //提交购物车
  submitCart: function() {
    var that = this;
    var dataList = that.data.dataList;
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].checked) {
        console.log("i:" + dataList[i]._ID);
        that.AddCart(dataList[i]._ID);  //提交到购物车
      }
    }
  },

  //提交数据到购物车
  AddCart:function(id){
    console.log("wx.request:"+id);
    wx.request({
      url: getApp().globalData.apiaddress + 'ShoppingCar/AddShoppingCar',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      data: {
        id: id,
        user: 'admin'
      },
      success: function (res) {
          console.log(id+'ok');
       },
       fail:function(msg){
         console.log(msg);
       }

    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


})