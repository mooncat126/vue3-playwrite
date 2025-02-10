const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// 允许跨域请求（如果前端运行在不同端口）
app.use(cors());

// API 路由：返回用户名
app.get('/api/user', (req, res) => {
    res.json({ name: 'Xiang', email: 'xiang@example.com' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
