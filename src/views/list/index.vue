<template>
 <div class="list-page">
  <el-row :gutter="20" class="animate__animated animate__fadeInLeft">
    <el-col :sm="24" :lg="4">
      <el-row>
        <el-col class="list-icon" :span="24">
          <div class="list-icon-box icon-back"><i class="el-icon-s-home" @click="handleBack"></i></div>
          <div class="list-icon-box icon-unfold"><i class="el-icon-s-unfold" @click="drawer=true"></i></div>
        </el-col>
        <el-col :span="24">
          列表
        </el-col>
      </el-row>
       
    </el-col>
    <el-col :sm="24" :lg="20">
        右边
    </el-col>
  </el-row>
   <el-drawer
      title="分类"
      :visible.sync="drawer"
      direction="ltr">
      <ul class="list-table">
        <li v-for="item in listTable" :key="item.type" @click="handleToShow(item)">{{ item.name }}</li>
      </ul>
    </el-drawer>
 </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        drawer: true,
        listTable: []
      }
    },
    mounted() {
      this.getListTable()
    },
    methods: {
      handleBack() {
        this.$router.push('/home')
      },
      getListTable() {
        const self = this  
        axios.get('/list/listTable')
        .then(function(res){
          self.listTable = res.data.data
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
  }
}
</style>