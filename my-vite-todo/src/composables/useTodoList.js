

import {ref} from "vue"
//exportを使って、外部から使える変数に無名関数を登録
export const useTodoList=()=>{
  
  //-fetchを使い、全件flaskのalltaskを呼び出す----------------
  const onmount_alltask = async()=>{
    try{
      const res = await fetch("/back_app/alltask")
      //fetch結果の本文のみ抽出しJSON化
      //→その中のtodos_listだけを取り出してreturnしPromiseResultに詰める
      const resjson = await res.json()

      return resjson.todos_list
      //呼び出した側はawait でこの関数を呼び出せば、PromiseResultが取り出せます
    }catch(e){
      console.log("error---")
      console.log(e)
    }
  }
  //----------------------------------------------------------------

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

