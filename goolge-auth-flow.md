# Google 登录完整流程（Code Exchange 方式）

## 🎯 完整流程

```
1. 用户在页面 A 点击 "Sign Up"
   ↓
2. 前端调用: GET /api/v1/auth/google?redirect_url=https://xxx.com/page-a
   ↓
3. 后端生成 state (包含 redirect_url)
   ↓
4. 返回 auth_url，前端跳转到 Google
   ↓
5. 用户在 Google 授权
   ↓
6. Google 回调后端: /api/v1/auth/google/callback?code=xxx&state=xxx
   ↓
7. 后端处理:
   - 验证 state
   - 用 code 换取 Google token
   - 获取用户信息
   - 创建/更新用户
   - 生成加密的 code (用于前端换取 token)
   - 302 重定向到: https://xxx.com/page-a?code=encrypted_code
   ↓
8. 浏览器跳转回页面 A (带 code 参数)
   ↓
9. useAuth 检测到 URL 有 code 参数
   ↓
10. 前端调用: POST /api/v1/auth/exchange-token
    Body: {"code": "encrypted_code"}
   ↓
11. 后端返回:
    {
      "token": "jwt_token",
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "User Name",
        "avatar_url": "https://...",
        "phone": null
      }
    }
   ↓
12. 前端:
    - 保存 token 到 localStorage
    - 保存用户信息到 localStorage
    - 更新 UI 状态
    - 清除 URL 中的 code 参数
   ↓
13. Navbar 显示用户信息
```

## 📦 localStorage 存储

```typescript
// Token
localStorage.setItem('auth_token', 'jwt_token_here')

// 用户信息
localStorage.setItem('auth_user', JSON.stringify({
  id: 1,
  email: "user@example.com",
  name: "User Name",
  avatar_url: "https://...",
  phone: null
}))
```

## 🔐 后续请求带 Token

所有需要认证的请求，在 Header 中带上：
```
Authorization: Bearer {token}
```

使用方式：
```typescript
import { authFetch, getAuthHeaders } from '@/lib/auth-utils'

// 方式 1: 使用 authFetch
const response = await authFetch('/api/v1/some-endpoint', {
  method: 'POST',
  body: JSON.stringify(data),
})

// 方式 2: 使用 getAuthHeaders
const response = await fetch('/api/v1/some-endpoint', {
  headers: getAuthHeaders(),
})
```

## ✅ 优点

1. ✅ URL 干净（code 会被清除）
2. ✅ Token 在 localStorage（前端可控）
3. ✅ 用户信息缓存（刷新页面不需要重新请求）
4. ✅ 支持跨域（不依赖 cookie）

## ⚠️ 注意事项

### 安全性
- code 应该是一次性的，使用后立即失效
- code 有效期应该很短（如 5 分钟）
- JWT token 应该设置合理的过期时间
- 敏感操作仍需二次验证

### Token 管理
- 登出时清除所有存储
- Token 过期时需要重新登录
- 可以考虑 refresh token 机制

