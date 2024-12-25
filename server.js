const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// 使用 bodyParser 中间件解析请求体中的 JSON 数据
app.use(bodyParser.json());

// 配置静态文件目录
app.use(express.static('static'));

// 模拟存储的评估数据
let evaluations = {
  group1: [],
  group2: [],
  group3: []
};

// POST 请求：提交数据
app.post('/submit', (req, res) => {
  const { group, data } = req.body;

  if (group && evaluations[group]) {
    evaluations[group] = data; // 更新对应分组的数据
    return res.status(200).send({ message: 'Data saved successfully' });
  }

  res.status(400).send({ message: 'Invalid group' });
});

// GET 请求：查看所有分组的数据
app.get('/summary', (req, res) => {
  res.status(200).send(evaluations); // 返回所有分组的数据
});

// 启动服务器，监听 3000 端口
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
