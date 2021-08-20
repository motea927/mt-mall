# mt-mall-backend

此目錄爲 mt-mall 主要後端目錄，主要以 Web (前端應用)及 Admin(後臺管理)兩項目的來做功能切分。

## 本地開發流程

1. 環境變數

於整個專案根目錄建立 config 資料夾('../config/')，建立 dev.env 及
test.env。

```
# dev.env 範例
# Localhost Server Port
PORT=3000
# 資料庫位置
DATABASE_URL=mongodb://127.0.0.1:27017/something
# JWT KEY
JWT_SECRET=something
# mode 不改動
mode=dev
```

```
# test.env 範例
# Localhost Server Port
PORT=3000
# 資料庫位置
DATABASE_URL=mongodb://127.0.0.1:27017/something-test
# JWT KEY
JWT_SECRET=something-test
# mode 不改動
mode=test
```

2. Install dependencies

```
npm install
```

3. Run Database (若使用線上服務跳過)

```
# DB 參數依需求至 package.json 更改
npm run start-db
```

4. Run Service

```
npm run dev
```

5. 測試 (此項可單獨作業，不受順序影響)

```
npm run test
```

## 目錄結構

```
.
├── README.md
├── app.js // 程式進入點
├── controllers // 操作邏輯
├── db // DB 連接
├── middleware // 身份認證
├── models // DB模型
├── routes // 路由
└── tests // 測試 jest
```

## 其餘資訊

- 密碼使用 Bcryptjs 做雜湊
- 使用 JWT 做身份認證
- 檔案上傳使用 Multer 存 Buffer 進資料庫 (因 Heroku 限制，否則也可採檔案上傳)
- 使用 REST API 風格開發

## todo

- 串接金流
