<script setup>
import {ref,onMounted,onUpdated} from "vue"
import {useTodoList} from "../composables/useTodoList.js"
const {test_fetchapi,add_btntask,edit_btntask,update_btntask,del_btntask,check_task} =useTodoList()


</script>

<template>
  <div class="header">
    <h1 @click="test_fetchapi" class="header_title">TODO</h1>
  </div>
</template>
<style scoped>
.header{
  width: 100%;
  background-color: #e3f2fd;
  text-align:center;
  font-size:32px;
  font-weight: bold;
  padding:8px 0;
}

</style>