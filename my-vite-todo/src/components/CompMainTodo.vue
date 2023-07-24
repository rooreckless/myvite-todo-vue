<script setup>
import {ref,onMounted,onUpdated} from "vue"
import {useTodoList} from "../composables/useTodoList.js"
const {onmount_alltask,add_btntask,update_btntask,del_btntask,check_task} =useTodoList()


//inputタグに入力された値
const todoRef=ref("")
//ローカルストレージのリスト
const todoListRef=ref([])

//3項演算子 ①localStorage.todoListが存在するとlsがundefinedでなくなる
//②lsが存在するなら todoListRef.valueがlocalStorage.todoListと一致させるためJSON.parse()
//③lsがない場合、todoListRefは空のリストにする
// const ls = localStorage.todoList
// todoListRef.value= ls ? JSON.parse(ls) : []

onMounted(async ()=>{
  // const res = await fetch("http://localhost:5000/back_app/alltask")
  // const resjson = await res.json()
  // todoListRef.value = await resjson.todos_list
  todoListRef.value = await onmount_alltask()
  // todoListRef.value =[{created_at: "Fri, 05 May 2023 05:05:05 GMT"
  //     ,id:2
  //     ,task: "555"
  //     ,updated_at: "Fri, 05 May 2023 05:05:05 GMT"}]  
})

const addTodo=async()=>{
    await add_btntask(todoRef.value)
    //登録後はinputタグの文字を消す
    todoRef.value=""
    todoListRef.value = await onmount_alltask()
  }

// const editTodo = (created_at)=>{
//   const {todo, idx} = edit_btntask(created_at)
//   //編集中なTodoの配列中でのindex
//   editingIdx=idx
//   //入力欄を編集中のtodoのtaskで書き換え
//   todoRef.value=todo.task
//   //編集中フラグをたてる
//   isEditRef.value=true
//   }
//↓以下へ変更します。
const editTodo = (target_todo)=>{
  //編集中なTodoの配列中でのindex
  // editingIdx=target_todo.id
  //入力欄を編集中のtodoのtaskで書き換え
  
  editingTodo=target_todo
  todoRef.value=target_todo.task
  //編集中フラグをたてる
  isEditRef.value=true
  }

//editボタンが押されるとTrueになる。
const isEditRef= ref(false)
//②editボタンが押された時の配列要素番号
// let editingIdx=-1
let editingTodo=undefined

//Updateボタンが押された時の挙動(後で中身を記述する準備)

const updateTodo=async()=>{
    // update_btntask(todoRef.value,editingIdx)
    await update_btntask(todoRef.value,editingTodo)
    //入力欄初期化
    todoRef.value=""
    //編集中フラグを下げる
    isEditRef.value=false
    //編集中todoのインデクスを初期化
    // editingIdx=-1
    editingTodo=undefined
    todoListRef.value = await onmount_alltask()
  }
//deleteボタンが押された時の挙動

// const deleteTodo=(created_at)=>{
//   del_btntask(created_at)
// }
const deleteTodo=async (target_todo)=>{
    todoListRef.value = await del_btntask(target_todo)
  }
const changeCheck=async(target_todo)=>{
  await check_task(target_todo)
  todoListRef.value =  await onmount_alltask()
}
</script>

<template>
  <div class="main_boxinput">
    <input type="text" name="inputbox1" class="main_boxinput_input" v-model="todoRef" placeholder="+ TODOを入力"/>
    <button class="main_boxinput_btn btn" @click="addTodo" v-if="isEditRef===false">Add</button>
    <button class="main_boxinput_btn btn" @click="updateTodo()" v-else>Update</button>
  </div>

  <div class="main_todolist" v-for="todo in todoListRef">
    <div class="main_todolist_todo">
      <div class="main_todolist_todo_task" :class="{fin : todo.checked}">
        <input type="checkbox" :checked="todo.checked" @change="changeCheck(todo)"/><label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <button class="btn green" @click="editTodo(todo)">edit</button>
        <button class="btn pink" @click="deleteTodo(todo)">delete</button>
      </div>
    </div>
  </div>
  <!-- <pre>todoListRef={{ todoListRef}}</pre> -->
</template>

<style scoped>
.main_boxinput{
  margin-top: 20px;
}
.main_boxinput_input{
  width:300px;
  margin-right:8px;
  padding:8px;
  font-size:18px;
  border:1px solid #aaa;
  border-radius:6px;
}
.main_boxinput_btn{
  background-color:#03a9f4;
  
}
.btn{
  border-radius:6px;
  color:#fff;
  text-align: center;
  font-size:14px;
  padding: 8px;
}

.main_todolist{
  margin-top:20px;
  display:flex;
  flex-direction:column;
  gap:4px;
}
.main_todolist_todo{
  display:flex;
  align-items:center;
  gap:8px;
}
.main_todolist_todo_task{
  border:1px solid #ccc;
  border-radius:6px;
  padding:12px;
  width:300px;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease-in-out;
  position: relative;
  margin:0 16px 2px 6px;
}

input[type="checkbox"]:checked::before{
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 13px;
  height: 13px;
  background: #8db3ff;
  border-radius: 2px;
}

input[type="checkbox"]:focus {
  border-color: #8db3ff;
}
.btns{
  display:flex;
  gap:4px;
}
.green{
  background-color: #00c85e;
}
.pink{
  background-color: #ff4081;
}
.fin{
  text-decoration: line-through;
  background-color: #ddd;
  color: #777;
}
</style>