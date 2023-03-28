import { reactive } from "vue";

export default function useUserList() {
  let state = reactive({
    userList: [],
  });
  const setState = (newState) => {
    console.log("newState", newState);
    // 把newState的值赋值给state
    state.userList.concat(newState);
    console.log("state", state.userList);
  };
  return {
    state,
    setState,
  };
}
