

import {ref} from "vue"
//exportを使って、外部から使える変数に無名関数を登録
export const useTodoList=()=>{
  //下3行はいままでも使ってきたローカルストレージからの読み込みの3項演算
  // const todoListRef=ref([])
  // const ls = localStorage.todoList
  // todoListRef.value=  [{created_at: "Fri, 05 May 2023 05:05:05 GMT"
  //     ,id:2
  //     ,task: "333"
  //     ,updated_at: "Fri, 05 May 2023 05:05:05 GMT"}]
  //-----------------------
  // try{
  //   const res= await fetch("/back_app/alltask");
  //   console.log("res----")
  //   console.log(res)
  //   // console.log(res.json()["todos_list"])
  //   const jsoned_res=await res.json()
  //   console.log(jsoned_res)
  //   console.log(jsoned_res["todos_list"])
  //   // todoListRef.value=  jsoned_res["todos_list"]
  //   todoListRef.value=  [{created_at: "Fri, 05 May 2023 05:05:05 GMT"
  //     ,id:2
  //     ,task: "222"
  //     ,updated_at: "Fri, 05 May 2023 05:05:05 GMT"}]
  // }catch(e){
  //   console.log("error---")
  //   console.log(e)
  // }

  // todoListRef.value= ls ? JSON.parse(ls) : []
  
  //-fetchを使い、全件flaskのalltaskを呼び出す----------------
  const onmount_alltask = async()=>{
    console.log("--onmount_alltask--")
    try{
      const res = await fetch("/back_app/alltask")
      console.log("--onmount_alltask--res=")
      console.log(res)
      console.log("res.json()=")
      console.log(res.json())
      //fetch結果の本文のみ抽出しJSON化
      //→その中のtodos_listだけを取り出してreturnしPromiseResultに詰める
      const resjson=await res.json()
      console.log("resjson.todos_list=")
      console.log(await resjson.todos_list)
      return await resjson.todos_list
      //呼び出した側はawait でこの関数を呼び出せば、PromiseResultが取り出せます
    }catch(e){
      console.log("error---")
      console.log(e)
    }
  }
  //----------------------------------------------------------------
  //ここから以下はボタンを押された時に呼び出される変数です。
  // const add_btntask =(task)=>{
  //   //id値として現在日時を取得
  //   const nowLocalStr = new Date().toLocaleString("ja")
  //   // リストにpushする
  //   todoListRef.value.push({created_at:nowLocalStr, task:task, checked:false})
  //   //ローカルストレージへ登録
  //   localStorage.todoList= JSON.stringify(todoListRef.value)
  
  // }
  //ここから以下はボタンを押された時に呼び出される変数です。
  const add_btntask =async(newtaskstr)=>{
    // サーバへ送りたいデータ
    const data = {newtaskstr:newtaskstr}
    // FetchAPIのオプション準備
    const param  = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", "charset":"utf-8"
      },
      // リクエストボディ
      body: JSON.stringify(data)
    };
    //fetch開始
    try{
      const res = await fetch("/back_app/createtask",param)
      //呼び出した側はawait でこの関数を呼び出せば、PromiseResultが取り出せます
    }catch(e){
      console.log("error---")
      console.log(e)
    }
  }
  const findByCreatedAt=(created_at)=>{
    //todoListRef.value.find()の処理をコピーし、todoをreturn
    const todo = todoListRef.value.find((searchingtodo)=>{return searchingtodo.created_at===created_at})
    return todo
  }
  const findindexByCreatedAt=(created_at)=>{
    //todoListRef.value.findIndex()の処理をコピーし、idxをreturn
    const idx = todoListRef.value.findIndex((searchingtodo)=>{return searchingtodo.created_at===created_at})
    return idx
  }
  // const update_btntask=(taskstr,idx)=>{
  //   //todoListRef.value[idx]を置き換え
  //   todoListRef.value[idx].task=taskstr
    
  //   //localStorageを登録し直し
  //   localStorage.todoList= JSON.stringify(todoListRef.value)
  // }
  const update_btntask=async(newtaskstr,editingTodo)=>{
    //flaskのupdatetaskを呼び出す
    
    // サーバへ送りたいデータ
    const data = {newtaskstr:newtaskstr,editingTodo:editingTodo}

    // FetchAPIのオプション準備
    const param  = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", "charset":"utf-8"
      },

      // リクエストボディ
      body: JSON.stringify(data)
    };

    try{
      const res = await fetch("/back_app/updatetask",param)
      //呼び出した側はawait でこの関数を呼び出せば、PromiseResultが取り出せます
    }catch(e){
      console.log("error---")
      console.log(e)
    }
  }
  
  const del_btntask=async (target_todo)=>{
    //警告メッセージ
    const delMsg="「"+target_todo.task+"」を削除しますか?"
    if (!confirm(delMsg)){
      //警告メッセージでokを押さなかった場合
      const resalltask = await onmount_alltask()
      //resalltaskはリスト。これをPromiseResult値としてPromiseオブジェクトを返す
      return resalltask
    }
    //todoListRef.valueのリストからidx番目要素を削除します。
    // todoListRef.value.splice(idx,1)
    //fetchを使って/back_app/deletetask/<taskid>を実行します。
    try{
      await fetch("/back_app/deletetask/"+target_todo.id,{method:"DELETE"})
      //削除自体は↑で終了しているので、削除後に↓の全件取得を実施
      const resalltask = await onmount_alltask()
      //resalltaskはリスト。これをPromiseResult値としてPromiseオブジェクトを返す
      return resalltask
      //呼び出した側はawait でこの関数を呼び出せば、PromiseResultが取り出せます
    }catch(e){
      console.log("error---")
      console.log(e)
      const resalltask = await onmount_alltask()
      //resalltaskはリスト。これをPromiseResult値としてPromiseオブジェクトを返す
      return resalltask
    }
  }

  const check_task=async(editingTodo)=>{
    //引数のeditingTodonのチェックを反転させる
    editingTodo["checked"]=!editingTodo["checked"]
    // サーバへ送りたいデータ
    const data = {editingTodo:editingTodo}
    

    // FetchAPIのオプション準備
    const param  = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", "charset":"utf-8"
      },

      // リクエストボディ
      body: JSON.stringify(data)
    };

    try{
      const res = await fetch("/back_app/changechecktask",param)
      //呼び出した側はawait でこの関数を呼び出せば、PromiseResultが取り出せます
    }catch(e){
      console.log("error---")
      console.log(e)
    }
  }

  
  //useTodoListとしてreturnするのは、todoListRefと、各関数を入れた変数
  return {onmount_alltask,add_btntask,update_btntask,del_btntask,check_task}
  }

  //------


// import {ref} from "vue"
// //exportを使って、外部から使える変数に無名関数を登録
// export const useTodoList=()=>{
//   //下3行はいままでも使ってきたローカルストレージからの読み込みの3項演算
//   const todoListRef=ref([])
//   const ls = localStorage.todoList
//   todoListRef.value= ls ? JSON.parse(ls) : []
  
  
//   //ここから以下はボタンを押された時に呼び出される変数です。
//   const add_btntask =(task)=>{
//     //id値として現在日時を取得
//     const nowLocalStr = new Date().toLocaleString("ja")
//     // リストにpushする
//     todoListRef.value.push({created_at:nowLocalStr, task:task, checked:false})
//     //ローカルストレージへ登録
//     localStorage.todoList= JSON.stringify(todoListRef.value)
  
//   }
//   const edit_btntask =(created_at)=>{
    
//     const todo=findByCreatedAt(created_at)
    
//     const idx=findindexByCreatedAt(created_at)
//     //editingIdx=idx

//     //todoRef.value=todo.task
//     return {todo,idx}
//   }
  
//   const findByCreatedAt=(created_at)=>{
//     //todoListRef.value.find()の処理をコピーし、todoをreturn
//     const todo = todoListRef.value.find((searchingtodo)=>{return searchingtodo.created_at===created_at})
//     return todo
//   }
//   const findindexByCreatedAt=(created_at)=>{
//     //todoListRef.value.findIndex()の処理をコピーし、idxをreturn
//     const idx = todoListRef.value.findIndex((searchingtodo)=>{return searchingtodo.created_at===created_at})
//     return idx
//   }
//   const update_btntask=(taskstr,idx)=>{
//     //todoListRef.value[idx]を置き換え
//     todoListRef.value[idx].task=taskstr
    
//     //localStorageを登録し直し
//     localStorage.todoList= JSON.stringify(todoListRef.value)
//   }
//   const del_btntask=(created_at)=>{
//     //findを使っている部分はfindByCreatedAt系に書き換え
//     const todo=findByCreatedAt(created_at)
//     const idx=findindexByCreatedAt(created_at)
//     //警告メッセージを表示します。
//     const delMsg="「"+todo.task+"」を削除しますか?"
//     if (!confirm(delMsg)){
//       //警告メッセージでokを押さなかった場合
//       return;
//     }
//     //todoListRef.valueのリストからidx番目要素を削除します。
//     todoListRef.value.splice(idx,1)
//     //localStorageを登録し直し
//     localStorage.todoList= JSON.stringify(todoListRef.value)
//   }
//   const check_task=(created_at)=>{
//     //押されたチェックボックスのtodoを特定します。findByCreatedAtとfindByIndexCreatedAtをつかいます。
//     const todo=findByCreatedAt(created_at)
//     const idx=findindexByCreatedAt(created_at)
//     //todoのcheckedを反転させます。
//     todo.checked = !todo.checked
    
//     //todoListRefのidx番目要素だけ書き換えます。
//     todoListRef.value[idx]=todo
//     //localStorageを登録し直し
//     localStorage.todoList= JSON.stringify(todoListRef.value)
//   }

  
//   //useTodoListとしてreturnするのは、todoListRefと、各関数を入れた変数
//   return {todoListRef,add_btntask,edit_btntask,update_btntask,del_btntask,check_task}
//   }