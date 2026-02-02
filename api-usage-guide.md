# API 统一处理层使用指南

## 概述

我们已经创建了一个统一的 API 响应处理层，它可以自动处理：
- 多种响应格式的统一解析
- 自动添加认证 token
- **自动同步后端返回的 token 更新**
- **自动同步后端返回的用户信息更新**
- **自动处理 401 未授权**
- 统一的错误处理
- TypeScript 类型支持

## 支持的响应格式

API 处理层自动兼容以下三种响应格式：

### 格式 1: 完整包装格式（推荐）
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "user": {...},
    "token": "..."
  }
}
```

### 格式 2: 简单包装格式
```json
{
  "data": {
    "user": {...},
    "token": "..."
  }
}
```

### 格式 3: 直接返回数据
```json
{
  "user": {...},
  "token": "..."
}
```

## 核心函数

### 1. `apiFetch<T>(url, options)`

统一的 API 请求函数，自动处理认证、错误和响应解析。

**使用示例：**

```typescript
import { apiFetch, ApiError } from '@/lib/auth-utils'

// 基本用法
try {
  const data = await apiFetch<{ user: User }>('/api/v1/user/profile')
  console.log(data.user)
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message, error.code)
  }
}

// POST 请求
const response = await apiFetch<AuthResponse>('/api/v1/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})

// 带类型的响应
interface KeywordList {
  keywords: Array<{ id: number; name: string }>
  total: number
}

const data = await apiFetch<KeywordList>('/api/v1/keywords')
console.log(data.keywords) // 自动提示类型
```

### 2. `unwrapApiResponse<T>(response)`

手动解包 API 响应（当你已经有原始响应时）。

```typescript
import { unwrapApiResponse } from '@/lib/auth-utils'

const rawResponse = await fetch('/api/v1/data')
const json = await rawResponse.json()
const data = unwrapApiResponse<MyDataType>(json)
```

### 3. `getApiErrorMessage(response, defaultMessage?)`

从响应中提取错误消息。

```typescript
import { getApiErrorMessage } from '@/lib/auth-utils'

const response = await fetch('/api/v1/data')
const json = await response.json()
const errorMessage = getApiErrorMessage(json, 'Default error message')
```

### 4. `isApiSuccess(response)`

检查 API 响应是否成功。

```typescript
import { isApiSuccess } from '@/lib/auth-utils'

const response = { code: 200, data: {...} }
if (isApiSuccess(response)) {
  console.log('Success!')
}
```

## 错误处理

### ApiError 类

所有 API 错误都会被包装成 `ApiError` 类型：

```typescript
try {
  const data = await apiFetch('/api/v1/data')
} catch (error) {
  if (error instanceof ApiError) {
    console.log('Error code:', error.code)      // HTTP 状态码
    console.log('Error message:', error.message) // 错误消息
    console.log('Error data:', error.data)      // 原始响应数据
  }
}
```

### 常见错误处理模式

```typescript
import { apiFetch, ApiError } from '@/lib/auth-utils'

async function fetchUserData() {
  try {
    const data = await apiFetch<User>('/api/v1/user/me')
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      // 处理特定错误码
      if (error.code === 401) {
        // 未授权，跳转到登录页
        router.push('/login')
      } else if (error.code === 404) {
        // 资源不存在
        console.error('User not found')
      } else {
        // 其他错误
        console.error('API Error:', error.message)
      }
    } else {
      // 网络错误或其他未知错误
      console.error('Unknown error:', error)
    }
    throw error
  }
}
```

## 在组件中使用

### React 组件示例

```typescript
'use client'

import { useState, useEffect } from 'react'
import { apiFetch, ApiError } from '@/lib/auth-utils'

interface Keyword {
  id: number
  name: string
  growth: number
}

export default function KeywordList() {
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchKeywords = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await apiFetch<{ keywords: Keyword[] }>('/api/v1/keywords')
        setKeywords(data.keywords)
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchKeywords()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul>
      {keywords.map(keyword => (
        <li key={keyword.id}>{keyword.name}</li>
      ))}
    </ul>
  )
}
```

### 在 Server Actions 中使用

```typescript
'use server'

import { apiFetch } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

export async function createKeyword(formData: FormData) {
  const name = formData.get('name') as string

  try {
    await apiFetch('/api/v1/keywords', {
      method: 'POST',
      body: JSON.stringify({ name })
    })

    revalidatePath('/keywords')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to create keyword' }
  }
}
```

## 认证处理

`apiFetch` 会自动从 localStorage 读取 token 并添加到请求头：

```typescript
// 自动添加 Authorization header
const data = await apiFetch('/api/v1/protected-resource')

// 等同于：
const response = await fetch('/api/v1/protected-resource', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('ideamine_token')}`,
    'Content-Type': 'application/json'
  }
})
```

## 兼容性

如果你需要使用原始的 `fetch` API（不自动解析响应），可以使用 `authFetch`：

```typescript
import { authFetch } from '@/lib/auth-utils'

const response = await authFetch('/api/v1/data')
const json = await response.json()
// 手动处理响应
```

## 最佳实践

1. **总是指定泛型类型**：这样可以获得更好的类型提示
   ```typescript
   const data = await apiFetch<User>('/api/v1/user')
   ```

2. **使用 try-catch 处理错误**：确保捕获并处理可能的错误
   ```typescript
   try {
     const data = await apiFetch(url)
   } catch (error) {
     // 处理错误
   }
   ```

3. **检查错误类型**：使用 `instanceof ApiError` 区分 API 错误和其他错误
   ```typescript
   if (error instanceof ApiError) {
     // 这是 API 错误
   }
   ```

4. **为用户显示友好的错误消息**：不要直接显示原始错误
   ```typescript
   catch (error) {
     const message = error instanceof ApiError
       ? error.message
       : 'Something went wrong. Please try again.'
     setError(message)
   }
   ```

## 后端响应格式建议

### 标准成功响应

为了最佳兼容性，建议后端使用以下统一格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 实际数据
  }
}
```

### 错误响应

```json
{
  "code": 400,
  "message": "Invalid request",
  "data": null
}
```

### 带 Token 更新的响应

当后端需要更新客户端 token 时（如 token 续期、权限变更等），在响应中包含新的 token：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "User Name",
      "role": "premium"
    },
    "token": "new_jwt_token_here"  // ← 前端会自动更新
  }
}
```

### 最佳实践

1. **总是返回 token**：在需要更新 token 的接口中，始终在响应中包含新的 token
   - 登录接口
   - 刷新 token 接口
   - 用户信息更新接口
   - 权限变更接口

2. **一致的字段名**：使用 `token` 或 `access_token` 作为字段名

3. **包含用户信息**：token 更新时，建议同时返回最新的用户信息

4. **401 处理**：统一使用 401 状态码表示未授权，前端会自动清除认证信息

## 调试和日志

### 控制台日志

当 token 或用户信息更新时，会在控制台输出日志：

```
🔄 Token updated from API response
✅ Token updated globally
```

```
🔄 User info updated from API response
✅ User info updated globally
```

```
⚠️ Unauthorized - clearing user state
```

### 查看当前状态

在浏览器控制台查看当前认证状态：

```javascript
// 查看当前 token
localStorage.getItem('ideamine_token')

// 查看当前用户信息
JSON.parse(localStorage.getItem('ideamine_user'))
```

## 常见问题

### Q: Token 什么时候会被更新？

A: 当后端任何 API 响应中包含 `token`、`access_token` 或 `jwt` 字段时，前端会自动更新 localStorage 中的 token。

### Q: 如何确保多个标签页的 token 同步？

A: 可以监听 `storage` 事件：

```typescript
useEffect(() => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'ideamine_token' && e.newValue) {
      console.log('Token updated in another tab')
      // 刷新用户状态
      refresh()
    }
  }

  window.addEventListener('storage', handleStorageChange)
  return () => window.removeEventListener('storage', handleStorageChange)
}, [])
```

### Q: 如何手动触发 token 刷新？

A: 使用 `useAuth` hook 提供的 `refresh` 方法：

```typescript
const { refresh } = useAuth()

// 手动刷新
await refresh(true)  // 传入 true 强制刷新
```

### Q: 401 响应会发生什么？

A: 当收到 401 响应时：
1. 自动清除 localStorage 中的 token 和用户信息
2. 触发 `onUnauthorized` 回调
3. 清除 React 状态中的用户信息
4. 可以在回调中跳转到登录页
