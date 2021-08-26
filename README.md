# mt-mall

mt-mall 是一套微電商系統，包含[後端伺服、API](https://github.com/motea927/mt-mall/tree/main/src) 至[前端商城應用](https://github.com/motea927/mt-mall/tree/main/web-client)及[商城後臺管理](https://github.com/motea927/mt-mall/tree/main/vue-admin-template-client)，基於 Node.js 和 Vue 相關技術開發而成。

系統主要包含商品系統、購物車系統、訂單系統、使用 JWT 做認證之會員中心等，API 使用 REST API 架構，本頁面主要以整個系統架構做說明。

Live demo: https://mt-mall.herokuapp.com/

![image](https://raw.githubusercontent.com/motea927/mt-mall/main/demoImg/demo.png)

## 目錄結構

```
.
├── config // 後端系統環境變數，需自行建立
├── src // 後端系統，主要爲 API 及 Web Server
├── vue-admin-template-client // 後臺系統之前端
└── web-client // 商城前端
```

## 專案技術

[前端商城應用](https://github.com/motea927/mt-mall/tree/main/web-client)

- Vue 3 With Composition API
- Typescript
- Vite
- Vuex
- Vue Router
- Tailwind CSS
- Axios

[商城後臺管理](https://github.com/motea927/mt-mall/tree/main/vue-admin-template-client)

- 基於[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)之基礎模板[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)開發而成
- [Element UI](https://github.com/ElemeFE/element)

[後端](https://github.com/motea927/mt-mall/tree/main/src)

- Node.js
- Express
- Bcryptjs
- Jsonwebtoken
- Jest
- MongoDB
- Mongoose
