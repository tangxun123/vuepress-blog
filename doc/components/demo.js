// 使用 for...of 循环结合 await
async function processItems(items) {
  for (const item of items) {
    try {
      const result = await processItem(item);
      console.log(`处理项目 ${item} 成功:`, result);
    } catch (error) {
      console.error(`处理项目 ${item} 失败:`, error);
    }
  }
}

// 使用普通 for 循环结合 await
async function processWithIndex(items) {
  for (let i = 0; i < items.length; i++) {
    try {
      const result = await processItem(items[i]);
      console.log(`处理第 ${i + 1} 个项目成功:`, result);
    } catch (error) {
      console.error(`处理第 ${i + 1} 个项目失败:`, error); 
    }
  }
}
