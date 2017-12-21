<template>
  <div>
    <header id="header">
      <div class="flex" id="title">
        <div class="flex1"></div>
        <div class="flex2 ac jc">
          <h1 class="f14 di">零度精选</h1>
          <i class="refresh-btn di" :class="{'rotate': refreshRotate}" @click="init"></i>
        </div>

        <div class="flex1"></div>
      </div>
      <nav class="swiper-container" id="nav">
        <ul class="swiper-wrapper" id="navBar">
          <li class="swiper-slide item" :class="{'active': activeIndex==index}" v-for="(cate, index) in category"
              @click="changeTab(index, cate.type)">
            <span>{{ cate.name }}</span>
          </li>
        </ul>
      </nav>
    </header>

    <div class="default-bg tc" v-show="!list[activeIndex]">
      <img src="../assets/img/loading.gif" alt="loading" width="100%">
      <div class="loading-text f14 grey">零度精选</div>
    </div>

    <div class="container">

      <div class="default-bg tc" v-show="!list[activeIndex]">
        <img src="../assets/img/loading.gif" alt="loading" width="100%">
        <div class="loading-text f14 grey">零度精选</div>
      </div>

      <div class="swiper-container white-bg" id="content">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in category">

            <!--<div class="default-bg tc" v-if="!list[item.type]">
              <img src="../assets/img/loading.gif" alt="loading" width="100%">
              <div class="loading-text f14 grey">零度精选</div>
            </div>-->

            <div class="list">
              <ul>
                <li v-for="item in list[activeIndex]">
                  <a @click="toDetail(item.url)" class="article-link flex">
                    <div class="article-desc flex2">
                      <h3 class="article-title tl">{{ item.title }}</h3>
                      <div class="article-author">
                        <!--<span class="hot_label space">热</span>-->
                        <span class="fl">{{ item.author }}</span>
                        <span class="fr">{{ item.time }}</span>
                      </div>
                    </div>
                    <div class="article-img flex1 ac">
                      <img :src="item.pic" width="100%"/>
                    </div>
                  </a>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import common from '@/common';
  import navComponent from '@/components/common/nav';

  export default {
    data () {
      return {
        category: Constant.category,
        activeIndex: 0,
        navSwiper: null,
        contentSwiper: null,
        list: [],
        refreshRotate: false
      }
    },
    components: {
      navComponent
    },
    watch: {
      //如果路由有变化，会再次执行该方法
      '$route': 'init'
    },
    mounted: function () {
      this.$nextTick (function () {
        // 一次性数据
        this.onceInit (this.init);

      })
    },
    methods: {
      onceInit (callback) {
        let vm = this;
        vm.contentSwiper = new Swiper ('#content', {
          // 向后翻动事件
          onSlideNextStart: function () {
            // 加载数据
            vm.activeIndex++;
            let params = {type: vm.category[vm.activeIndex].type};
            setTimeout(function () {
              vm.getData (params);
            },2000)

          },
          // 向前翻动事件
          onSlidePrevStart: function () {
            // 加载数据
            vm.activeIndex--;
            let params = {type: vm.category[vm.activeIndex].type};
            vm.getData (params);
          }
        });

        vm.navSwiper = new Swiper ('#nav', {
          freeMode: true,
          freeModeMomentumRatio: 0.5,
          slidesPerView: 'auto',
        });

        callback ();
      },
      init () {
        let vm = this;
        vm.getData ();
//        vm.list[0] = [{title: 'asdf'}];
//        console.log (vm.list)
        // 视口的宽度
        let oHeader = document.getElementById ('header');
        let headerWidth = oHeader.offsetWidth;
        // 视口中间对应的translate
        let midHeaderWidth = headerWidth / 2;

        let oNavBar = document.getElementById ('navBar');
        let aNavItem = oNavBar.getElementsByTagName ('li');
        // 每一个li的宽度
        let navItemWidth = aNavItem[0].offsetWidth;

        // 最大可变换距离
        let maxTranslate = vm.navSwiper.maxTranslate ();

        vm.$watch ('activeIndex', function (newValue, oldValue) {
          // 当前active的li的中间对应的translate
          let activeItemTranslate = newValue * navItemWidth + navItemWidth / 2;

          if (activeItemTranslate < midHeaderWidth) {
            // 如果小于视口中间，则不动
            vm.navSwiper.setWrapperTranslate (0)
          } else if (activeItemTranslate > Math.abs (maxTranslate) + midHeaderWidth) {
            // 如果大于最大距离+视口中间距离，则移动最大距离
            vm.navSwiper.setWrapperTranslate (maxTranslate)
          } else {
            // 如果大于视口中间，则向左移动 视口中间距离-当前项中间距离
            vm.navSwiper.setWrapperTranslate (midHeaderWidth - activeItemTranslate)
          }
        })

      },
      getData (params) {
        let vm = this;
        vm.refreshRotate = true;
        // 清空list
//        vm.list[vm.activeIndex] = [];
        common.fetchData ({
          method: 'get',
          url: `${API_HOST}/wx/list`,
          params: params,
          hideLoading: true,
          success: data => {
            setTimeout(function () {
              vm.refreshRotate = false;
            }, 2000);
            vm.list[vm.activeIndex] = data.data;
            vm.list[vm.activeIndex].map (v => {
              v.time = vm.humanTime (v.timestamp);
            })
//        console.log (vm.list[vm.activeIndex])
          }
        })
      },
      changeTab (index, type) {
        let vm = this;
        vm.activeIndex = index;
        vm.contentSwiper.slideTo (index, 500, false);
        let params = {
          type: type
        };
        vm.getData (params);
      },
      toDetail (url) {
        this.$router.push ({name: 'detail', params: {url: url}})
      },
      humanTime (timestamp) {
        let vm = this;
        return vm.formatDate (timestamp * 1000);
      },
      formatDate (time) {
        if (time) {
          let date = new Date (time);
          let format = date.getFullYear () + '-' + addZero (date.getMonth () + 1) + '-' + addZero (date.getDate ());
          return format + ' ' + addZero (date.getHours ()) + ':' + addZero (date.getMinutes ()) + ':' + addZero (date.getSeconds ());

          function addZero (num) {
            return num > 9 ? num : '0' + num;
          }
        }
      }
    },

  }
</script>

<style>
  #title {
    height: 3.5rem;
    background: #62b900;
    color: #fff;
  }

  #header {
    width: 100%;
    position: fixed;
    z-index: 999;
    background: #f4f5f6;
  }

  nav {
    width: 100%;
    overflow: hidden;
    font: 16px/32px hiragino sans gb, microsoft yahei, simsun;
    border-bottom: 1px solid #f8f8f8;

  }

  nav .swiper-slide {
    padding: 0 5px;
    letter-spacing: 2px;
    width: 5rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
  }

  nav .swiper-slide span {
    transition: all .3s ease;
    display: block;
  }

  nav .active span {
    transform: scale(1.2);
    color: #FF2D2D;
  }

  .refresh-btn {
    margin-left: 0.5rem;
    width: 1.6rem;
    height: 1.6rem;
    background: url(../assets/img/refresh.png) no-repeat;
    background-size: 100%;
  }
  .refresh-btn.rotate{
    transform: rotate(720deg) ;
    animation: refreshRotate 2s;

  }
  @keyframes refreshRotate
  {
    from {transform: rotate(0);}
    to {transform: rotate(720deg);}
  }

  /*.header {
      overflow-x: scroll;
      height: 3.5rem;
      background: #f4f5f6;
      line-height: 3.5rem;
  }

  .header ul {
      width: 100rem;
      height: 3.5rem;

  }

  .header li {
      float: left;
      height: 3.5rem;
      line-height: 3.5rem;
      width: 5rem;
      text-align: center;
      font-size: 1.1rem;
  }
  .header li.active {
      color: #42b983;
      font-size: 1.2rem;
  }
  */
  /*#header {
      width: 100%;
      overflow: hidden;
      font: 16px/32px hiragino sans gb, microsoft yahei, simsun;
      border-bottom:1px solid #f8f8f8;
  }
  #header .swiper-slide {
      padding: 0 5px;
      letter-spacing:2px;
      width:3rem;
      text-align:center;
  }
  #header .swiper-slide span{

      transition:all .3s ease;
      display:block;
  }
  #header .active span{
      transform:scale(1.1);
      color:#FF2D2D;
  }*/
  .default-bg {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -4rem;
    margin-left: -4rem;
    width: 8rem;
    height: 8rem;
    z-index: 3;
  }

  .list li a {
    padding: 1rem;
    border-bottom: 1px solid #ccc;
  }

  .list h3 {
    margin-right: 1rem;
    font-size: 1.16rem;
    font-weight: normal;
  }

  .list .article-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .list .article-author {
    margin: 0.6rem 1rem 0 0;
    font-size: 0.8rem;
  }

  .list .article-img img {
    max-height: 6rem;
  }

</style>
