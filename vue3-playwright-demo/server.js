const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// 允许跨域请求
app.use(cors());

// API 路由：模拟正常和错误响应
app.get('/api/user', (req, res) => {
    // 如果请求参数包含 `?error=true`，强制返回 500
    if (req.query.error === 'true') {
        return res.status(500).json({ error: 'Server Error: Unable to fetch user data' });
    }

    // 50% 概率返回 500 错误
    if (Math.random() < 0.5) {
        return res.status(500).json({ error: 'Server Error: Random failure occurred' });
    }

    // 延迟 3 秒后返回用户信息
    setTimeout(() => {
        res.json({ name: 'Xiang', email: 'xiang@example.com' });
    }, 3000);
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
