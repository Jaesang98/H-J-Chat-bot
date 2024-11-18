<template>
  <div class="container">
    <div class="main-content">
      <div class="chat-area">
        <div
          class="chat-contents"
          v-for="(chatList, idx) in chatList"
          :key="idx"
        >
          <div class="chat-card userchat">{{ chatList.userMessage }}</div>
          <div class="chat-card aichat">
            <img
              class="chat-aiImg"
              src="@/assets/img/chat-icon.png"
              @click="todoRobot"
            />
            <span>{{ chatList.aiMessage }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="search-content footer-fix">
      <input
        class="input01"
        type="text"
        placeholder="메시지를 입력하세요"
        v-model="inpMessage"
        v-on:keyup.enter="fetchMessage()"
      />
      <button class="btn01 ml-5" @click="fetchMessage()">전송</button>
    </div>

    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      background-color="#000"
      color="#fff"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "@/assets/css/global.scss";
import axios from "axios";
import { useRoute } from "vue-router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const route = useRoute();

/* 채팅관련 */
const inpMessage = ref(route.query.inpMessage); // 사용자 메시지
const chatList = ref([]); // 봇 메시지
const isLoading = ref(false); // 로딩 상태

onMounted(async () => {
  if (inpMessage.value) {
    await fetchMessage();
  }
});

async function fetchMessage() {
  try {
    isLoading.value = true; // Start loading

    const response = await axios.post("/api/chat-service/api/v1/gpt/question", {
      messages: [inpMessage.value],
    });

    const result = await response.data;
    if (result.code === 200) {
      chatList.value.push({
        userMessage: inpMessage.value,
        aiMessage: result.data.messages[0],
      });
    } 
    else {
      alert("회사내부망이용 및 임현영 연구원을 찾아가세요");
    }
  } 
  catch (error) {
    alert('임현영 연구원을 찾아가세요');
  } 
  finally {
    isLoading.value = false;
    inpMessage.value = '';
  }
}

function todoRobot() {
  alert("임현영은 남자이며 아직 준비중입니다.");
}
</script>

<style></style>