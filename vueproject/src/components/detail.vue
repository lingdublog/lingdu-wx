<template>
    <div>
        <header class="header fixed-top pr">
            <div class="back pl1">
                <router-link :to="{name: 'index'}">< 返回</router-link>
            </div>
            <h2 class="tc f12" style="font-weight: normal;">零度精选</h2>
        </header>
        <div class="container">
            <div class="default-bg">
                <img src="../assets/img/loading.gif" alt="loading" width="100%">
                <div class="loading-text f14 grey">零度精选</div>
            </div>
            <div class="content pr white-bg pd4p oh">
                <!--<iframe class="video_iframe" style="z-index:1;" src="http://v.qq.com/iframe/player.html?vid=t01662frswa"></iframe>-->


                <h1 class="f16">{{ data.title }}</h1>
                <div class="info">
                    <span>{{ data.author }}</span>
                    <span>{{ data.time }}</span>
                </div>
                <div class="main" v-html="data.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import common from '@/common';
  import navComponent from '@/components/common/nav';
  export default {
    name: 'hello',
    data () {
      return {
        data: {}
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
        common.fetchData ({
          method: 'get',
          url: `${API_HOST}/wx/detail`,
          params: {url: vm.$route.params.url},
          hideLoading: true,
          success: data => {
            vm.data = data.data;
          }
        });

        callback ();
      },
      init(){
        let vm = this;

      }
    },

  }
</script>

<style>
    .back{
        position: absolute;left: 0;
        top:0;}
    img{max-width: 100%;}
</style>
