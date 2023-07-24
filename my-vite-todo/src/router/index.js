import { createRouter, createWebHistory } from "vue-router";
//①ルーティングの対象となるコンポーネントを追加
import About from "../components/About.vue"
import CompMainTodo from "../components/CompMainTodo.vue"
import NotFound from "../components/NotFound.vue"
//② 1の追加コンポーネントを表示するためのルーティングを、以下の配列要素にオブジェクトで追加
const routes = [
  {
      path: "/",
      name: "Top",
      component: CompMainTodo,
  },
  {
      path: "/mainTodo",
      name: "MainTodo",
      component: CompMainTodo,
  },
  {
      path: "/about",
      name: "About",
      component: About,
  },
  {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component:NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;