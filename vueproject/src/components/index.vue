<template>
    <div>
        <header class="header fixed-top">
            <ul class="pr" id="navBar">
                <li :class="{'active': activeIndex==index}" v-for="(cate, index) in category"
                    @click="changeTab(index, cate.type)">
                    {{ cate.name }}

                </li>
            </ul>
        </header>

        <div class="container">
        <div class="default-bg">
            <img src="../assets/img/loading.gif" alt="loading" width="100%">
            <div class="loading-text f14 grey">零度精选</div>
        </div>
        <div class="swiper-container white-bg">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item,index in category">
                    <div class="list" v-if="activeIndex==index">

                        <ul>
                            <li v-for="item in list">
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
                                        <img :src="item.pic" width="100%" />
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
        mySwiper: null,
        list: []
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
      onceInit(callback){
        let vm = this;
        vm.mySwiper = new Swiper ('.swiper-container', {
          // 向后翻动事件
          onSlideNextStart: function (swiper) {
            let index = parseInt (swiper.activeIndex);
            // 先删除多余的slide，删除向前数第2个
              /*if (index-2>=0) {
               swiper.removeSlide(index-2);
               }*/
            // 添加新的slide，向后插入
              /*if (vm.activeIndex+2 <= vm.category.length) {
               swiper.appendSlide('<div class="swiper-slide">Slide '+ (vm.activeIndex+2) +'</div>');
               }*/
            // 加载数据
            vm.activeIndex ++;
            let params = {type: vm.category[vm.activeIndex].type};
            vm.getData (params);
          },
          // 向前翻动事件
          onSlidePrevStart: function (swiper) {
            let index = parseInt (swiper.activeIndex);
            // 先删除多余的slide，删除向后数第2个
            // swiper.removeSlide(index+2);
            // 添加新的slide，向前插入
              /*if (vm.activeIndex > 0) {
               swiper.prependSlide('<div class="swiper-slide">Slide '+ (vm.activeIndex) +'</div>');
               }*/

            // 加载数据
            vm.activeIndex --;
            let params = {type: vm.category[vm.activeIndex].type};
            vm.getData (params);
          }
        });
        callback ();
      },
      init(){
        let vm = this;
        vm.getData ();
        common.Vue.$on('slide', function (params) {
          console.log (params)
          vm.getData(params);
        });
      },
      getData(params){
        let vm = this;
        // 清空list
        vm.list = [];
        common.fetchData ({
          method: 'get',
          url: `${API_HOST}/wx/list`,
          params: params,
          hideLoading: true,
          success: data => {
            vm.list = data.data;
            vm.list.map(v => {
              v.time = vm.humanTime(v.timestamp);
            })
          }
        })
      },
      changeTab(index, type){
        let vm = this;
        vm.activeIndex = index;
        vm.mySwiper.slideTo (index, 500, false);
        let params = {
          type: type
        };
        vm.getData(params);
      },
      toDetail(url){
        /*window.wizViewManager.create('detail', {
          src: "http://baidu.com",
        x: 0,
          y: 0
      }, function (suc) {
          window.alert(suc);
        }, function (err) {
          window.alert(err)
        });
        window.wizViewManager.load('detail');*/
//       window.open(`http://baidu.com`, '_self', 'location=no')
//       window.open(`/#/detail`, '_self', 'location=no')
//        cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
        this.$router.push({name: 'detail', params: {url: url}})
      },
      humanTime(timestamp){
        let vm = this;
        return vm.formatDate(timestamp* 1000);
      },
      formatDate(time){
        if (time) {
          let date = new Date(time);
          let format = date.getFullYear() + '-' + addZero(date.getMonth()+1) + '-' + addZero(date.getDate());
          return format + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());

          function addZero (num) {
            return num > 9 ? num : '0' + num;
          }
        }
      }
    },

  }
</script>

<style>
    ::-webkit-scrollbar {
        display: none;
    }

    .header {
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

    .default-bg{
        position: absolute;left: 50%;
        top: 50%;margin-top: -4rem; margin-left:-4rem;width: 8rem;height: 8rem;z-index: -1;}


    .list li a{padding: 1rem; border-bottom: 1px solid #ccc;}
    .list h3{margin-right: 1rem; font-size: 1.16rem;font-weight: normal;}
    .list .article-desc{display: flex;flex-direction: column;justify-content: center;}
    .list .article-author{margin: 0.6rem 1rem 0 0;font-size: 0.8rem;}
    .list .article-img img{max-height: 6rem;}

</style>
