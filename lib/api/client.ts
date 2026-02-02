/**
 * API 客户端基础类
 * 提供统一的请求方法和错误处理
 */

import { apiFetch, ApiError } from '@/lib/auth-utils';
import { buildApiUrl } from './config';

/**
 * 基础 API 客户端类
 */
export class ApiClient {
  /**
   * GET 请求
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return apiFetch<T>(url, {
      method: 'GET',
    });
  }

  /**
   * POST 请求
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const url = buildApiUrl(endpoint);
    return apiFetch<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT 请求
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const url = buildApiUrl(endpoint);
    return apiFetch<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH 请求
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const url = buildApiUrl(endpoint);
    return apiFetch<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE 请求
   */
  async delete<T>(endpoint: string): Promise<T> {
    const url = buildApiUrl(endpoint);
    return apiFetch<T>(url, {
      method: 'DELETE',
    });
  }

  /**
   * 构建带查询参数的 URL
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = buildApiUrl(endpoint);

    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    // 过滤掉 undefined 和 null 的参数
    const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    const queryString = new URLSearchParams(
      Object.entries(filteredParams).map(([key, value]) => [
        key,
        String(value),
      ])
    ).toString();

    return queryString ? `${url}?${queryString}` : url;
  }
}

/**
 * 导出单例实例
 */
export const apiClient = new ApiClient();
