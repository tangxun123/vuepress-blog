<template>
    <el-dialog
        title="deepSeek"
        :visible.sync="visible"
        width="45%"
        @close="">
        <div class="answer-container">
            <div v-for="item in messages">
                <!-- 问题 -->
                <div v-if="item.role === 'user'" class="user-content">
                    <span>{{ item.content }}</span>
                </div>
                <!-- 回答 -->
                <div v-else-if="item.role === 'assistant'" class="assistant-content">
                    <img src="/deepSeek.svg" alt="" class="deepSeek-svg" />
                    <span v-html="item.content"></span>
                </div>
            </div>
        </div>
        <span slot="footer" class="footer">
            <el-input v-model="question" placeholder="给DeepSeek发送消息" clearable @clear="" @keyup.enter="askAQuestion">
                <template #append>
                    <el-button :icon="Search" @click="askAQuestion" />
                </template>
            </el-input>
        </span>
    </el-dialog>
    
</template>
<script setup>
import { ref } from 'vue';
import { ElDialog, ElButton, ElInput, ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue'
import MarkdownIt from 'markdown-it';
import axios from 'axios';
const apiKey = 'sk-7f41d9092acd4a24989b78b4ea8a5f9b';
const baseURL = 'https://api.deepseek.com/v1';

const markdown = new MarkdownIt()
const visible = defineModel('visile');
const messages = ref([
    // { role: "user",  content: '什么是js'},
    // { role: "assistant",  content: 'js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是jsjs就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是js就是就是....'},
]);
const question = ref('');
const isLoading = ref(false);

const askAQuestion = async () => {
    console.log(11);
  if(!question.value) return ElMessage.warning('请输入你的问题！！！');
  try {
    isLoading.value = true
    const response = await axios.post(
      `${baseURL}/chat/completions`,
      {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: question.value }],
        temperature: 0.0, // 场景设置 代码生成/数学解题 0.0，  数据抽取/分析	1.0，  通用对话	1.3，  翻译	1.3，   创意类写作/诗歌创作	1.5
        stream: false // 流式传输需特殊处理
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )
    getRes(response)
    messages.value.push({ role: 'user', content: question.value })
    messages.value.push({
        role: response.data.choices[0].message.role,
        content: markdown.render(response.data.choices[0].message.content),
    })
  } catch (error) {
    console.error('API调用失败:', error.response?.data || error.message)
  } finally {
    isLoading.value = false
  }
}
async function getRes(res) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while(1) {
    // 读取数据流的第一块数据，done表示数据流是否完成，value表示当前的数
    const {done, value} = await reader.read();
    if (done) break;
    const text = decoder.decode(value);
    // 打印第一块的文本内容
    console.log(text, done);
  }
}
</script>
<style scoped>
.answer-container {
    border: 1px solid #cccccc82;
    margin-bottom: 12px;
    padding: 12px;
    height: 60vh;
    overflow-y: scroll;
}
.user-content  {
    padding: 6px 10px;
    margin-bottom: 12px;
    border-radius: 20px;
    background-color: #eff6ff;
}
.assistant-content  {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 48px;
    position: relative;
}
.assistant-content span {
    border-left: 2px solid #e5e5e5;
    padding-left: 12px;
}
.assistant-content .deepSeek-svg {
    width: 36px;
    margin-right: 12px;
    position: absolute;
    top: 0;
    left: 0;
}
.answer-container::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

.answer-container::-webkit-scrollbar-thumb {
  width: 8px;
  height: 79px;
  border-radius: 6px;
  background-color: #ccc;
}

.answer-container::-webkit-scrollbar-track {
  border-radius: 6px;
}
/* .answer-container:hover .answer-container::-webkit-scrollbar{
    width: 6px;
} */
</style>