<template>
  <div class="container">
    <div class="main-content main">
      <div class="search-content">
        <div class="search-title">🤖 무엇을 도와드릴까요?</div>
        <div class="mt-5">
          <input 
            class="input01" 
            type="text" 
            placeholder="메시지를 입력하세요" 
            v-model="inpMessage"
            v-on:keyup.enter="goTochat"/>
          <button class="btn01 ml-5" @click="goTochat">전송</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import "@/assets/css/global.scss";
import { useRouter } from 'vue-router';

const router = useRouter();
const inpMessage = ref('');
const randomCode = ref(crypto.randomUUID());

function goTochat() {
  router.push({
    name: 'main0002',
    state: {
      inpMessage: inpMessage.value
    },
    params: {
      randomCode: randomCode.value
    }
  })
}
</script>

<style>
</style>
