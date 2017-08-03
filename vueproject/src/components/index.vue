<template>
    <div class="hello">
        <div class="header">
            <ul class="pr" id="navBar">
                <li :class="{'active': activeIndex==index}" v-for="cate,index in category"
                    @click="changeTab(index, cate.type)">
                    {{ cate.name }}

                </li>
            </ul>
        </div>

        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item,index in category">
                    <div class="list" v-if="activeIndex==index">
                        <ul>
                            <li v-for="item in list">
                                <a :href="item.url" class="article-link flex">
                                    <div class="article-desc flex2">
                                        <h3 class="article-title">{{ item.title }}</h3>
                                        <div class="article-author">
                                            <!--<span class="hot_label space">热</span>-->
                                            <span class="fl">{{ item.author }}</span>
                                            <span class="fr">{{ item.time }}</span>
                                        </div>
                                    </div>
                                    <div class="article-img flex1 ac">
                                        <img :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + item.pic" width="100%" />
                                    </div>
                                </a>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import common from '@/common';
  export default {
    name: 'hello',
    data () {
      return {
        category: [
          {
            type: '0',
            name: '热门'
          }, {
            type: '1',
            name: '推荐'
          }, {
            type: '2',
            name: '段子手'
          }, {
            type: '3',
            name: '养生堂'
          }, {
            type: '4',
            name: '私房话'
          }, {
            type: '5',
            name: '八卦精'
          }, {
            type: '6',
            name: '爱生活'
          }, {
            type: '7',
            name: '财经迷'
          }, {
            type: '8',
            name: '汽车迷'
          }, {
            type: '9',
            name: '科技咖'
          }, {
            type: '10',
            name: '潮人帮'
          }, {
            type: '11',
            name: '辣妈帮'
          }, {
            type: '12',
            name: '点赞党'
          }, {
            type: '13',
            name: '旅行家'
          }, {
            type: '14',
            name: '职场人'
          }, {
            type: '15',
            name: '美食家'
          }, {
            type: '16',
            name: '古今通'
          }, {
            type: '17',
            name: '学霸族'
          }, {
            type: '18',
            name: '星座控'
          }, {
            type: '19',
            name: '体育迷'
          }
        ],
        selected: '1',
        active: true,
        msg: 'Welcome to Your Vue.js App',
        activeIndex: 0,
        mySwiper: null,
        list: []
      }
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
        })
        callback ();
      },
      init(){
        let vm = this;
        vm.getData ();
      },
      getData(params){
        let vm = this;
        common.fetchData ({
          method: 'get',
          url: `/api/wx/list`,
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
        vm.mySwiper.slideTo (index, 1000, false);
        let params = {
          type: type
        };
        vm.getData (params);
      },
      humanTime(timestamp){
        let vm = this;
        return vm.formatDate(timestamp* 1000);
      },
      formatDate(time){
        if (time) {
          let date = new Date(time);
          console.log (date)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    ::-webkit-scrollbar {
        display: none;
    }

    .header {
        width: 100%;
        overflow-x: scroll;
        height: 3.5rem;
    }

    .header ul {
        width: 100rem;
        height: 3.5rem;
        background: #f4f5f6;
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

    .header .cur-bar {
        left: 0;
        bottom: 0;
        width: 5rem;
        height: 2px;
        background: #42b983;
        transition: all 1s;
    }

    .list li a{padding: 1rem 2rem; border-bottom: 1px solid #ccc;}
    .list h3{margin-right: 1rem; font-size: 1.16rem;font-weight: normal;}
    .list .article-desc{display: flex;flex-direction: column;justify-content: center;}
    .list .article-author{margin: 0.6rem 1rem 0 0;font-size: 0.8rem;}
    .list .article-img img{max-height: 6rem;}
    /*.list .article-time{margin-right: 1rem;}*/
    /*.list .article-link{
        font-size: 0;
        display: block;padding: 2rem 0;}
    .list .article-desc{display: inline-block;
        width: 67%;
        vertical-align: middle;}
    .list .article-img{    overflow: hidden;
        width: 33%;
        display: inline-block;
        vertical-align: middle;

        height: 1.96875rem;
        position: relative;
        background: url(//s3b.pstatp.com/growth/mobile_list/image/toutiaoicon_loading_textpage@3x_f7c130ce94874fad96bbd5aed7bf4982.png) #efefef no-repeat 50%;
        background-size: 50%;}*/
</style>
