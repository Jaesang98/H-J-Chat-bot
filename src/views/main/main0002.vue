<template>
  <div class="container">
    <div class="main-content">
      <div class="chat-area">
        <div class="chat-contents" v-for="(chatList, idx) in chatList" :key="idx">
          <div class="chat-card userchat">{{ chatList.userMessage }}</div>
          <div class="chat-card aichat">
            <img class="chat-aiImg" src='@/assets/img/chat-icon.png' @click="todoRobot">
            <span>{{ chatList.aiMessage }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="search-content footer-fix">
      <input class="input01" type="text" placeholder="메시지를 입력하세요" v-model="inpMessage" />
      <button class="btn01 ml-5" @click="fetchMessage()">전송</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "@/assets/css/global.scss";
import axios from "axios";
import { useRoute } from 'vue-router';

const route = useRoute();
const inpMessage = ref(route.query.inpMessage);
const chatList = ref([]);

onMounted(() => {
  if (inpMessage.value) {
    fetchMessage();
  }
})

async function fetchMessage() {
  try {
    const response = await axios.post("/api/chat-service/api/v1/gpt/question", {
      messages: [inpMessage.value],
    });


    const result = await response.data;
    if (result.code === 200) {

      chatList.value.push({
        userMessage: inpMessage.value,
        aiMessage: result.data.messages[0]
      });

      inpMessage.value = '';
    }
    else {
      alert("회사내부망이용 및 임현영 연구원을 찾아가세요");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function todoRobot() {
  alert("임현영은 남자이며 아직 준비중입니다.")
}
</script>

<style></style>
