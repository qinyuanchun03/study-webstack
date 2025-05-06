---
title: "代码高亮示例"
date: 2023-05-05T12:00:00+08:00
draft: false
categories: ["技术教程"]
tags: ["代码高亮", "Markdown", "Hugo"]
---

# 代码高亮示例

本文展示了不同编程语言的代码高亮效果，这对于学术研究和技术博客非常有用。

## Python 代码示例

```python
def fibonacci(n):
    """计算斐波那契数列的第n个数"""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# 测试函数
for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")
```

## R 语言代码示例

```r
# 创建一个简单的数据框
data <- data.frame(
  name = c("Alice", "Bob", "Charlie", "David"),
  age = c(25, 30, 35, 40),
  score = c(85, 92, 78, 95)
)

# 计算平均分数
mean_score <- mean(data$score)
print(paste("平均分数:", mean_score))

# 使用ggplot2绘制图表
library(ggplot2)
ggplot(data, aes(x = name, y = score)) +
  geom_bar(stat = "identity", fill = "steelblue") +
  labs(title = "学生分数", x = "姓名", y = "分数") +
  theme_minimal()
```

## JavaScript 代码示例

```javascript
// 定义一个简单的类
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `你好，我是${this.name}，今年${this.age}岁。`;
  }
}

// 创建实例并调用方法
const alice = new Person('Alice', 25);
console.log(alice.greet());

// 使用Promise处理异步操作
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 25 });
    }, 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## SQL 代码示例

```sql
-- 创建学生表
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INT,
  major VARCHAR(50),
  enrollment_date DATE
);

-- 插入数据
INSERT INTO students (id, name, age, major, enrollment_date)
VALUES 
  (1, '张三', 20, '计算机科学', '2022-09-01'),
  (2, '李四', 22, '数学', '2021-09-01'),
  (3, '王五', 21, '物理学', '2022-09-01');

-- 查询数据
SELECT name, major
FROM students
WHERE age > 20
ORDER BY name;
```

## LaTeX 数学公式示例

LaTeX 是学术论文写作中常用的排版系统，特别适合数学公式的展示：

```latex
% 定义一个简单的文档
\documentclass{article}
\usepackage{amsmath}
\usepackage{amssymb}

\begin{document}

\title{数学公式示例}
\author{江湖笔者}
\date{\today}
\maketitle

\section{基本公式}

二次方程的求根公式：
\begin{equation}
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\end{equation}

\section{高级公式}

麦克斯韦方程组：
\begin{align}
\nabla \cdot \vec{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \vec{B} &= 0 \\
\nabla \times \vec{E} &= -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0 \vec{J} + \mu_0 \varepsilon_0 \frac{\partial \vec{E}}{\partial t}
\end{align}

\end{document}
```

## 总结

代码高亮功能对于技术博客和学术网站非常重要，它可以提高代码的可读性，使读者更容易理解和学习。Hugo 的代码高亮功能支持多种编程语言，可以满足不同领域的需求。
