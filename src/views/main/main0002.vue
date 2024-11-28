<template>
  <div class="container">
    <div class="main-content">
      <div class="chat-history">
        <div v-for="(groupedHistory,idx) in groupedHistory" :key="idx" class="mb-30">
          <div class="chat-title">{{groupedHistory.date}}</div>
          <div class="history-list">
            <div class="history-item" v-for="(items,idx) in groupedHistory.items" :key="idx"
            @click="showHistory(items.id)">{{ items.items[0].title }}</div>
          </div>
        </div>
      </div>

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
/* eslint-disable */
import { ref, onMounted } from "vue";
import "@/assets/css/global.scss";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const route = useRoute();
const router = useRouter();

/* 채팅관련 */
const inpMessage = ref(history.state.inpMessage); // 사용자 메시지
const chatList = ref([]);                         // 봇 메시지
const isLoading = ref(false);                     // 로딩 상태
const randomCode = ref();                         // 랜덤 코드

/* 히스토리 */
const groupedHistory = ref({});   // 날짜별로 묶은 데이터
const isFirst = ref(true)         // 처음 채팅하는지의 대한 여부

onMounted(async () => {
  await fetchHistory();

  inpMessage.value = await history.state.inpMessage;
  randomCode.value = await route.params.randomCode;

  if (inpMessage.value && randomCode.value) {
    await fetchMessage();
    history.replaceState({ ...history.state, inpMessage: null }, '');

    setTimeout(() => {
      fetchHistory();
    },2000)
  }
  else if (!inpMessage.value && randomCode.value) {
    fetchHistoryDetail();
    isFirst.value = false;
  }
});


/* 메시지 전송 */
async function fetchMessage() {
  try {
    isLoading.value = true; // Start loading

    const response = await axios.post("/api/chat-service/api/v1/gpt/question", {
      messages: [inpMessage.value],
      id: randomCode.value
    });

    const result = await response.data;
    if (result.code === 200) {
      chatList.value.push({
        userMessage: inpMessage.value,
        aiMessage: result.data.messages[0],
      });
    } 
    else {
      alert("회사내부망이용을 이용해주세요");
    }
  } 
  catch (error) {
    alert('현재 서버가 실행되고있지 않습니다');
  } 
  finally {
    isLoading.value = false;
    inpMessage.value = '';
  }
}

/* 메시지 히스토리 */
async function fetchHistory() {
  try {
    isLoading.value = true; // Start loading

    const response = await axios.get("/api/chat-service/api/v1/gpt/history");
    const result = await response.data;

    if (result.code === 200) {
      const historyList = result.data.historyList;

      // Group by date and then by ID
      const dateGrouped = historyList.reduce((acc, item) => {
        const dateKey = item.date.split(' ')[0];

        if (!acc[dateKey]) {
          acc[dateKey] = {};
        }

        if (!acc[dateKey][item.id]) {
          acc[dateKey][item.id] = [];
        }

        acc[dateKey][item.id].push({
          seq: item.seq,
          title: item.title,
          date: item.date
        });

        return acc;
      }, {});

      // Transform the grouped data into the desired format
      groupedHistory.value = Object.keys(dateGrouped).map(date => ({
        date,
        items: Object.keys(dateGrouped[date]).map(id => ({
          id,
          items: dateGrouped[date][id]
        }))
      }));

    } else {
      alert("회사내부망이용을 이용해주세요");
    }
  } 
  catch (error) {
    alert('현재 서버가 실행되고있지 않습니다');
  } 
  finally {
    isLoading.value = false;
    inpMessage.value = '';
  }
}

async function showHistory(chatID) {
  randomCode.value = await chatID;
  fetchHistoryDetail();
}

/* 메시지 히스토리 디테일 */
async function fetchHistoryDetail() {
  try {
    isLoading.value = true;

    const newRoute = { ...route, params: { ...route.params, randomCode: randomCode.value } };
    router.push(newRoute);

    const response = await axios.get("/api/chat-service/api/v1/gpt/history/detail", {
      params: {
        id: randomCode.value,
      },
    });

    const result = await response.data;
    if (result.code === 200) {
      chatList.value = [];
      const qnaList = result.data.qnaList;

      qnaList.forEach(item => {
        chatList.value.push({
          userMessage: item.question,
          aiMessage: item.answer,
        });
      });
    } else {
      alert("회사내부망이용을 이용해주세요");
    }
  } 
  catch (error) {
    alert('현재 서버가 실행되고있지 않습니다');
  } 
  finally {
    isLoading.value = false;
    inpMessage.value = '';
  }
}

function todoRobot() {
  alert("안녕하세요~! 도움을 원하시면 채팅 부탁드립니다!");
}
</script>

<style></style>