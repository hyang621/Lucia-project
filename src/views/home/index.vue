<template>
  <div id="home-page">
    <el-row class="home-content" :style="devicePC ? 'padding: 100px 20%':'padding: 20px'">
      <el-col :span="24">
        <div class="photo"><img src="../../assets/image/hhh.jpg"/></div>
      </el-col>
      <el-col :span="24">
          <el-row :gutter="20">
            <el-col :sm="24" :md="12" :class="devicePC ? 'flex-right':'flex-center'">
              <transition name="el-zoom-in-center">
                <div v-show="show" class="transition-box transition-box-first">
                  <ul>
                    <li class="home-title animate__animated animate__backInDown">筱乌龟的壳</li>
                  </ul>
                </div>
              </transition>
            </el-col>
            <el-col :sm="24" :md="12">
                <el-row>
                  <el-col :span="24" :class="devicePC ? 'flex-left':'flex-center'">
                    <transition name="el-zoom-in-top" >
                      <div v-show="show" @click="handleTo('bj')" class="transition-box animate__animated animate__bounce">前端笔记</div>
                    </transition>
                  </el-col>
                  <el-col :span="24" :class="devicePC ? 'flex-left':'flex-center'">
                  <transition name="el-zoom-in-bottom">
                      <div v-show="show" @click="handleTo('fx')" class="transition-box animate__animated animate__pulse">分享</div>
                    </transition>
                  </el-col>
                </el-row>
            </el-col>
          </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        show: true
      }
    },
    computed: {
        devicePC: {
            ...mapState({
                get: state => state.device.devicePC
            })
        }
    },
    mounted() {
    },
    methods: {
      handleTo(str){
        if(str === 'bj') {
          this.$router.push('/list')
        } else if(str === 'fx') {
          this.$router.push('/share')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
#home-page{
  margin: 0 auto;
  background: url("../../assets/image/bg.jpg") no-repeat center 0;
  background-attachment: fixed;
  opacity: 0.8;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .home-content{
    padding: 20px;
    overflow-y: auto;
    width: 100%;
    height: 100%;
  }
  .photo{
    text-align: center;
    margin: 20px 0 ;
    img{
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
  .transition-box {
    margin-bottom: 10px;
    width: 100%;
    min-width: 300px;
    height: 200px;
    border-radius: 4px;
    background-color: #fff;
    text-align: center;
    color: #333;
    padding: 40px 20px;
    box-sizing: border-box;
    opacity: 0.8;
    cursor: pointer;
    .home-title{
      color: #333;
      font-style: italic;
      text-shadow: 0 1px hsl(0, 0%, 85%),0 2px hsl(0, 0%, 80%),0 3px hsl(0, 0%, 75%),0 4px hsl(0, 0%, 70%),0 5px hsl(0, 0%, 65%),0 5px 10px black;
      font-size: 30px;
      font-family: "Microsoft YaHei"
    }
  }
  .transition-box-first{
    height: 400px;
  }
}
</style>