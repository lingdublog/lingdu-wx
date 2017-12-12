<template>

    <header class="header fixed-top">
        <ul class="pr" id="navBar">
            <li :class="{'active': activeIndex==index}" v-for="(cate, index) in category"
                @click="changeTab(index, cate.type)">
                {{ cate.name }}

            </li>
        </ul>
    </header>

</template>

<script>
  import common from '@/common';
  export default {
    name: 'hello',
    data () {
      return {
        category: Constant.category,
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

        callback ();
      },
      init(){
        let vm = this;
//        console.log (vm.$parent)
//        vm.getData ();
      },
      changeTab(index, type){
        let vm = this;
        vm.activeIndex = index;
        vm.$parent.mySwiper.slideTo (index, 500, false);
        let params = {
          type: type
        };
        common.Vue.$emit('slide', params);
      },
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
