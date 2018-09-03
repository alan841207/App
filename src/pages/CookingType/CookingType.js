// pages/CookingType/CookingType.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      apiaddress: getApp().globalData.apiaddress,
      imgaddress: getApp().globalData.imgaddress,
      title:'',
      count:0,
      dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that=this;
    this.setData({
      title: options.id
    });

    //对应每个类别内所有商品
    wx.request({
      url: getApp().globalData.apiaddress + 'WebChatData/GetAllInventoryListById/' + options.id,
      success:function(res){
        console.log(res.data);
        that.setData({
          dataList: res.data
        })
      }
    })
  },

  //选中商品并添加到购物车内
  changed:function(e){
    wx.request({
      url: getApp().globalData.apiaddress+'ShoppingCar/AddTest',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
        method:'GET',
      data: {
          id:e.detail.value[0],
          user:'admin'
        },
        success:function(res)
        {
        }
    });

  },

  //全选
  checkAll:function(e){
    var checked = e.detail.value;
    console.log(e.detail.value);
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
  calcateTotal:function(){
    var total=0;
    var dataList = this.data.dataList;
    for (var i = 0; i < dataList.length; i++) {
      if(dataList[i].checked)
      {
        total+=1;
      } 
    }
    this.setData({
      count:total
    })
  },

  //单个选择
  checkItem:function(e){
    var checked = e.detail.value;
    if(checked){
      this.data.count++;
    }
    else{
      this.data.count--;
    }

    this.setData({
      count: this.data.count
    });

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
  
  },


  switch1Checked: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  switch2Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  }

})