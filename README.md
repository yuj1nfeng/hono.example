# 架构文档 (Architecture Documentation)

## 项目概述
本项目是一个基于 Hono 框架的示例应用，主要用于展示如何构建一个模块化的后端服务。项目包含以下核心模块：

1. **控制器 (Controller)**：处理业务逻辑，位于 `controller/` 目录下。
2. **中间件 (Middleware)**：提供通用的请求处理逻辑，位于 `middleware/` 目录下。
3. **脚本 (Script)**：用于数据库操作和生成模拟数据，位于 `script/` 目录下。
4. **测试 (Tests)**：包含 API 测试用例，位于 `tests/` 目录下。

## 技术栈
- **运行时**：Node.js (Bun)
- **框架**：Hono
- **数据库**：PostgreSQL (通过 Sequelize 操作)
- **存储**：S3 兼容存储
- **测试框架**：Vitest

## 核心模块

### 1. 控制器 (Controller)
控制器模块负责处理具体的业务逻辑，每个控制器文件对应一个 API 端点。主要功能包括：
- 数据验证
- 数据库操作
- 文件上传与处理

控制器分为两个版本：
- `v1`：基础功能
- `v2`：扩展功能

### 2. 中间件 (Middleware)
中间件模块提供通用的请求处理逻辑，包括：
- 请求日志记录 (`logger.js`)
- 跨域处理 (`cors.js`)
- 错误处理 (`error.js`)
- 请求限流 (`limit.js`)

### 3. 脚本 (Script)
脚本模块用于辅助开发和测试，包括：
- 数据库同步 (`db.pull.js`, `db.push.js`)
- 生成模拟数据 (`gen.mock.js`)
- 生成数据库模型 (`gen.schema.js`)

### 4. 测试 (Tests)
测试模块包含 API 测试用例，覆盖以下场景：
- 基本 CRUD 操作
- 文件上传
- 视频处理

## 依赖管理
项目依赖通过 `package.json` 管理，主要依赖包括：
- `hono`：核心框架
- `sequelize`：数据库 ORM
- `zod`：数据验证
- `yaml`：配置文件解析

## 环境配置
环境变量通过 `.env` 文件配置，包括：
- 数据库连接 (`POSTGRES_URL`)
- S3 存储配置 (`S3_ENDPOINT`, `S3_ACCESS_KEY`)
- 应用端口 (`PORT`)

## 启动与部署

### 本地启动
```bash
bun run index.ts
```

### 初始化
```bash
bun run init
```

### 测试
```bash
bun test
```

## 后续优化建议
1. 增加 Swagger 文档支持。
2. 引入 CI/CD 流程。
3. 优化数据库查询性能。
4. 增加监控和告警功能。