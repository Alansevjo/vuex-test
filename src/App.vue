<template>
  <div id="app">
   <a-input placeholder="请输入任务"  class="my_ipt" :value="inputValue" @change="inputChaneg"/>
   <a-button type="primary" @click="addItmeToList">添加事项</a-button>
   <a-list bordered :dataSource="infoList" class="dt_list">
     <a-list-item slot="renderItem" slot-scope="item" >
       <!-- 复选框 -->
       <a-checkbox :checked="item.done" @change="(e) =>{cbStatucChange(e,item.id)}">{{item.info}}</a-checkbox>
       <a slot="actions" @click="delItemById(item.id)">删除</a>
     </a-list-item>
     <div slot="footer" class="footer">
       <span>{{unDonenum}}条剩余</span>
       <a-button-group>
         <a-button :type="viewKey === 'all' ? 'primary':'default'" @click="changeList('all')">全部</a-button>
         <a-button :type="viewKey === 'undone' ? 'primary':'default'" @click="changeList('undone')">未完成</a-button>
         <a-button :type="viewKey === 'done' ? 'primary':'default'" @click="changeList('done')">已完成</a-button>
       </a-button-group>
       <a @click="ckeanItem">清除已完成</a>
     </div>
   </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  components: {
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDonenum', 'infoList'])
  },
  methods: {
    ...mapMutations(['setInput', 'additem', 'removeItem', 'changeState', 'clean', 'chengeKeys']),
    // 监听文本框内容变化
    inputChaneg (e) {
      console.log(e.target.value)
      // this.$store.commit('setInput', e.target.value)
      this.setInput(e.target.value)
    },
    // 向list新增item
    addItmeToList () {
      // .trim()去除两端空格
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      }
      this.additem()
    },
    // 根据id删除事项
    delItemById (id) {
      console.log(id)
      this.removeItem(id)
    },
    // 复选框
    cbStatucChange (e, id) {
      console.log(id)
      console.log(e.target.checked)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.changeState(param)
    },
    // 清除已完成的任务
    ckeanItem () {
      this.clean()
    },
    // 修改展示数据
    changeList (key) {
      console.log(key)
      this.chengeKeys(key)
    }
  }
}
</script>

<style scoped>
  #app {
    padding: 10px;
  }

  .my_ipt {
    width: 500PX;
    margin-right: 10px;
  }

  .dt_list {
    width: 600px;
    margin-top: 10px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
