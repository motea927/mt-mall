# :art: mt-mall-frontend

Demo：https://mt-mall.herokuapp.com/

基於 **Vue 3** 所製作，爲一個微電商系統，系統主要包含商品系統、購物車系統、訂單系統、使用 JWT 做認證之會員中心等，API 使用 REST API 架構

![image](https://raw.githubusercontent.com/motea927/mt-mall/main/demoImg/demo.png)

## :page_facing_up: 技術

- **Vue 3**：前端 MVVM 框架，搭配 Composition API 進行開發
- **Vue Router**：路由狀態管理
- **Vuex**：Vue 狀態管理
- **TypeScript**：JavaScript 的嚴格超集，提供靜態型別、類型推斷等功能
- **Vite**：新一代 Vue build tool & dev server
- **Tailwind CSS**：新一代工具類 CSS 框架
- **Prettier**：程式碼格式化工具
- **Axios**： Promise Based HTTP Request 工具
- **Maska**： Input Mask 工具
- **JSON Server**： Fake REST API Server，用於初期開發切版，達成前後端開發分離
- **vuex-persistedstate**： Vuex 狀態持久化
- **secure-ls**： LocalStorage 加密、壓縮工具
- **SweetAlert2**： Popup UI 框架

## :coffee: 本地開發方式

- dev-fake-db，本地開發並使用 JSON Server，不需依賴本專案之後端及資料庫，主要用於初期畫面切版，搭配前端根目錄下 .env.development 環境變數使用。

```bash
#  dev-fake-db
$ npm run dev-fake-db
```

- dev-mongodb，搭配本專案後端使用，需先 RUN 起後端環境，參考[後端目錄](https://github.com/motea927/mt-mall/tree/main/src)，搭配前端根目錄下 .env.development-mongodb 環境變數使用。

```bash
# dev-mongodb
$ npm run dev-mongodb
```

## 參考資源

- 整體 UI Reference: https://xd.adobe.com/spec/934efdb7-a7e4-47d5-572e-efece0914f62-e57f/screen/a91298a6-689f-4b38-8821-b6840ec64910/
