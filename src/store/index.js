import Vue from 'vue'
import Vuex from 'vuex'
// 导入axios
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框内容
    inputValue: '',
    // 下一个id
    nextId: 3,
    viewKey: 'all'
  },
  mutations: {
    init (state, list) {
      state.list = list
    },
    // 为state的inputValue赋值
    setInput (state, val) {
      state.inputValue = val
    },
    // 添加列表项
    additem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除对应的列表项
    removeItem (state, id) {
      // 根据id查找对应的item
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改复选框的状态
    changeState (state, param) {
      // 根据id查找对应的item
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清除已完成
    clean (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改展示选项按钮
    chengeKeys (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('init', data)
      })
    }
  },
  getters: {
    // 统计未完成的条数
    unDonenum(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
