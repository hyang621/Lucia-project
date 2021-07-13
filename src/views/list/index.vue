<template>
 <div class="list-page">
  <el-row :gutter="20" class="animate__animated animate__fadeInLeft">
    <!-- 左边列表 -->
    <el-col :sm="24" :md="4">
      <el-row>
        <el-col class="list-icon" :span="24">
          <div class="list-icon-box icon-back"><i class="el-icon-s-home" @click="handleBack"></i></div>
          <div class="list-icon-box icon-unfold"><i class="el-icon-s-unfold" @click="drawer=true"></i></div>
        </el-col>
        <el-col :span="24">
          <ul class="list-info">
            <li v-for="(item,index) in listInfo" :key="index" @click="handleToShowInfo(item,index)"  :class="{'current-tab-color':currentIndex==index?true:false}">{{ item.category }}</li>
          </ul>
        </el-col>
      </el-row>
    </el-col>
    <!-- 右边展示详细 -->
    <el-col :sm="24" :md="20">
      <h3 style="text-align:center;font-size: 30px;">{{ currentCate.name }}</h3>
      <ul class="list-info-detail">
         <li v-for="(item,index) in currentListInfo" :key="index">
           <dl>
             <dt>{{index + 1}}、{{ item.title }}</dt>
             <dd v-for="(ele,i) in item.result" :key="i"><span class="dot"></span>{{ele}}</dd>
           </dl>
         </li>
      </ul>
    </el-col>
  </el-row>
  <!-- 弹出总的类别列表 -->
   <el-drawer
      title="分类"
      :visible.sync="drawer"
      direction="ltr">
      <ul class="list-table">
        <li v-for="item in listTable" :key="item.type" @click="handleToShow(item)" :class="{'current-color':currentCate.name==item.name?true:false}">{{ item.name }}</li>
      </ul>
    </el-drawer>
 </div>
</template>

<script>
import axios from 'axios'
import { getlistTable } from '@/api/api'
  export default {
    data() {
      return {
        drawer: false,
        listTable: [],
        currentCate: {},
        listInfo: [],
        currentListInfo: [],
        currentIndex: 0
      }
    },
    mounted() {
      this.getListTable()
    },
    methods: {
      handleBack() {
        this.$router.push('/home')
      },
      // 点击详细的列表，展示数据
      handleToShowInfo(item, index) {
        this.currentListInfo  = item.list
        this.currentIndex = index
      },
      // 点击类别展示页面
      handleToShow(item) {
        this.currentCate = item
        this.getListInfo(item.type)
      },
      // 获取某个类别的详细信息
      getListInfo(type) {
        const self = this
        axios.get('/list/listInfo/view')
        .then(function(res){
          self.drawer = false
          self.listInfo = res.data.data.filter(item => item.type == type)
          self.handleToShowInfo(self.listInfo[0],0)
        })
        .catch(function(err){
          console.log(err);
        });
      },
      // 获取全部分类
      getListTable() {
        const self = this  
        getlistTable()
        .then(function(res){
          self.listTable = res.data || []
          self.handleToShow(self.listTable[0])
        })
        .catch(function(err){
          console.log(err);
        });
      }
    }
  }
</script>

<style lang="less" scoped>
.list-page{
  padding: 20px;
  background: url("../../assets/image/pic_c.jpg") no-repeat 0 0;
  width: 100%;
  height: 100%;
  .list-icon{
    display: flex;
    justify-content: center;
    border-bottom: 1px dashed #0078e7;
    padding: 0 0 20px 0;
    .list-icon-box{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 100%;
      cursor: pointer;
    }
    .icon-back{
      background: #0078e7;
      margin-right: 10px;
      i{
        color: #fff;
        font-size: 30px;
      }
    }
    .icon-unfold{
      border: 1px solid #0078e7;
      background: #fff;
      i{
        color:#0078e7;
        font-size: 30px;
      }
    }
  }
  .list-table{
    padding: 20px;
    li{
      font-size: 18px;
      color: #0078e7;
      line-height: 40px;
      font-weight: 600;
      cursor: pointer;
    }
    li:hover{
      color: #67c23a;
      font-size: 20px;
    }
    .current-color{
      color: #67c23a;
      font-size: 20px;
    }
  }
  .list-info{
    padding: 20px;
    li{
      line-height: 30px;
      font-size: 14px;
      cursor: pointer;
    }
    li:hover{
      color: rgb(208, 255, 0);
      opacity: 0.8;
      font-size: 16px;
    }
    .current-tab-color{
      color: rgb(208, 255, 0);
      font-size: 16px;
    }
  }
  .list-info-detail{
    padding: 20px;
    li{
      dl{
        dt{
          font-weight: 600;
          margin-bottom: 10px;
        }
        dd{
          padding: 0 20px;
          line-height: 26px;
          .dot{
            width: 8px;
            height: 8px;
            border-radius: 100%;
            background: #333;
            opacity: 0.7;
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>