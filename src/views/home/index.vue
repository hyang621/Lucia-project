<template>
  <div id="home-page">
    <el-row class="home-content">
      <el-col :span="24">
        <div class="photo"><img src="../../assets/image/hhh.jpg"/></div>
      </el-col>
      <el-col :span="24">
          <el-row :gutter="20">
            <el-col :sm="24" :lg="12">
              <transition name="el-zoom-in-center">
                <div v-show="show" class="transition-box transition-box-first">
                  <ul>
                    <li class="home-title animate__animated animate__backInDown">筱乌龟的壳</li>
                  </ul>
                </div>
              </transition>
            </el-col>

            <el-col :sm="24" :lg="12">
                <el-col>
                  <transition name="el-zoom-in-top" >
                    <div v-show="show" @click="handleTo('bj')" class="transition-box animate__animated animate__bounce">前端笔记</div>
                  </transition>
                </el-col>
                <el-col>
                 <transition name="el-zoom-in-bottom">
                    <div v-show="show" @click="handleTo('fx')" class="transition-box animate__animated animate__pulse">分享</div>
                  </transition>
                </el-col>
            </el-col>
          </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true
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
    padding: 100px 25% 0 25% ;
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
    height: 175px;
    border-radius: 4px;
    background-color: #fff;
    text-align: center;
    color: #333;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
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
    height: 360px;
  }
}
</style>