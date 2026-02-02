/**
 * Keyword API 服务
 * 处理所有关键词相关的 API 调用
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
  Keyword,
  KeywordDetailData,
  KeywordListParams,
  KeywordListResponse,
  UnlockKeywordResponse,
} from '@/lib/types';

/**
 * Keyword 服务类
 */
class KeywordService {
  /**
   * 获取关键词列表
   * @param params - 查询参数（limit, offset, keyword_status, search）
   * @returns 关键词列表
   */
  async getList(params?: KeywordListParams): Promise<Keyword[]> {
    // apiClient.get 已经通过 unwrapApiResponse 自动解包了 data 字段
    // 所以直接返回即可，不需要再访问 .data
    return apiClient.get<Keyword[]>(
      API_ENDPOINTS.KEYWORD.LIST,
      params
    );
  }

  /**
   * 获取关键词详情
   * @param id - 关键词 ID
   * @returns 关键词详情
   */
  async getDetail(id: number): Promise<KeywordDetailData> {
    return apiClient.get<KeywordDetailData>(API_ENDPOINTS.KEYWORD.DETAIL(id));
  }

  /**
   * 创建关键词
   * @param data - 关键词数据
   * @returns 创建的关键词
   */
  async create(data: Partial<Keyword>): Promise<Keyword> {
    return apiClient.post<Keyword>(API_ENDPOINTS.KEYWORD.CREATE, data);
  }

  /**
   * 更新关键词
   * @param id - 关键词 ID
   * @param data - 更新的数据
   * @returns 更新后的关键词
   */
  async update(id: number, data: Partial<Keyword>): Promise<Keyword> {
    return apiClient.put<Keyword>(API_ENDPOINTS.KEYWORD.UPDATE(id), data);
  }

  /**
   * 删除关键词
   * @param id - 关键词 ID
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.KEYWORD.DELETE(id));
  }

  /**
   * 搜索关键词
   * @param query - 搜索关键词
   * @param params - 其他查询参数
   * @returns 关键词列表
   */
  async search(query: string, params?: Omit<KeywordListParams, 'search'>): Promise<Keyword[]> {
    // apiClient.get 已经通过 unwrapApiResponse 自动解包了 data 字段
    return apiClient.get<Keyword[]>(
      API_ENDPOINTS.KEYWORD.SEARCH,
      { ...params, search: query }
    );
  }

  /**
   * 解锁关键词（消耗 1 个 credit）
   * @param id - 关键词 ID
   * @returns 解锁响应
   */
  async unlock(id: number): Promise<UnlockKeywordResponse> {
    return apiClient.post<UnlockKeywordResponse>(API_ENDPOINTS.KEYWORD.UNLOCK(id), {});
  }
}

/**
 * 导出单例实例
 */
export const keywordService = new KeywordService();

/**
 * 导出类型供其他模块使用
 */
export type { KeywordService };
