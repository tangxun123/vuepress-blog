<template>
    <el-drawer v-model="visible" size="70%" title="DeepSeek">
        <div class="answer-container">
            <div v-for="(item, index) in messages">
                <!-- 问题 -->
                <div v-if="item.role === 'user'" class="user-content" :style="{ marginTop: index > 0 ? '36px' : '' }">
                    <span>{{ item.content }}</span>
                </div>
                <!-- 回答 -->
                <div v-else-if="item.role === 'assistant'" class="assistant-content">
                    <img src="/deepSeek.svg" alt="" class="deepSeek-svg" />
                    <span v-html="renderMd(item.content)"></span>
                </div>
                <!-- <div v-if="index % 2 === 1" class="loading" v-loading="isLoading"></div> -->
            </div>
            <div class="loading" v-loading="isLoading"></div>
        </div>
        <span slot="footer" class="footer">
            <el-input v-model="question" placeholder="给DeepSeek发送消息" clearable @keyup.enter.stop="askAQuestion">
                <template #append>
                    <el-button type="primary" @click.stop="askAQuestion">搜索</el-button>
                </template>
            </el-input>
        </span>
    </el-drawer>

</template>
<script setup>
import { onUnmounted, ref } from 'vue';
import { ElDrawer, ElInput, ElButton,ElMessage, vLoading } from 'element-plus';
import MarkdownIt from 'markdown-it';
const apiKey = 'sk-7f41d9092acd4a24989b78b4ea8a5f9b';
const baseURL = 'https://api.deepseek.com/v1';

const markdown = new MarkdownIt()
const renderMd = (val) => {
    return markdown.render(val)
}
const visible = defineModel('visile');
const messages = ref([]);
const question = ref('');
const answerIndex = ref(-1);
const isLoading = ref(false);

const askAQuestion = async () => {
    if (!question.value) return ElMessage.warning('请输入你的问题！！！');
    isLoading.value = true;
    messages.value.push({ role: 'user', content: question.value });
    messages.value.push({ role: 'assistant',  content: '' });
    try {
        const response = await fetch(
            `${baseURL}/chat/completions`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{ role: 'user', content: question.value }],
                    temperature: 0.0, // 场景设置 代码生成/数学解题 0.0，  数据抽取/分析	1.0，  通用对话	1.3，  翻译	1.3，   创意类写作/诗歌创作	1.5
                    stream: true // 流式传输需特殊处理
                })
            }
        )
        answerIndex.value += 2;

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                isLoading.value = false;
                buffer = '';
                break
            };

            buffer += decoder.decode(value, { stream: true });
            const chunks = buffer.split('\n\n');

            for (let i = 0; i < chunks.length - 1; i++) {
                const chunk = chunks[i].replace('data: ', '');
                messages.value[answerIndex.value].content += JSON.parse(chunk)?.choices[0].delta.content;
                requestAnimationFrame(() => {
                    const container = document.querySelector('.answer-container');
                    container.scrollTop = container.scrollHeight;
                })
            }
            buffer = chunks[chunks.length - 1];
        }
    } catch (error) {
        console.error('API调用失败:', error.response?.data || error.message)
    } finally {
        isLoading.value = false
    }
}

onUnmounted(() => {
    messages.value = [];
})
</script>
<style scoped>
.answer-container {
    border: 1px solid #cccccc82;
    margin-bottom: 12px;
    padding: 12px;
    height: 80vh;
    overflow-y: scroll;
}

.user-content {
    padding: 6px 10px;
    margin-bottom: 12px;
    border-radius: 20px;
    background-color: #eff6ff;
}

.assistant-content {
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

.loading {
    width: 12px;
    height: 12px;
    margin: 16px 48px;
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
</style>