const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// 允许跨域请求
app.use(cors());

// API 路由：延迟 3 秒后返回用户信息
app.get('/api/user', (req, res) => {
    setTimeout(() => {
        res.json({ name: 'Xiang', email: 'xiang@example.com' });
    }, 3000); // 延迟 3000 毫秒（3 秒）
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
