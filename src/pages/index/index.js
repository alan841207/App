//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      imgUrls:[
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      indicatorDots: true, 
      autoplay: true,
      interval: 5000,
      duration: 1000,
      dataList:[],   //所有的商品明细
      dataType:[]    //商品类别
  },
  //事件处理函数

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onLoad: function () {

    var that=this;
    var typeThis=this;

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //类别
    wx.request({
      url: app.globalData.apiaddress+'WebChatCookingType/GetAllCookingType',
      success: function (res) {
        console.log(res);
        console.log('end');
        typeThis.setData({
          dataType:res.data
        })
      }
    });

    //所有商品
    wx.request({
      url: app.globalData.apiaddress +'WebChatData/GetAllInventoryList',
      success: function (res) {
        console.log(res.data);
        that.setData({
          dataList:res.data
        })
      }
    });
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  
  navigateToType: function (e) {
      var id = e.currentTarget.dataset.id;
    console.log("navigateToType--> ID:", id)
      wx.navigateTo({
        url: '../CookingType/CookingType?id='+id
      })
    },

})
