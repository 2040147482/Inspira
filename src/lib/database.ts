import { createClient, type Database } from './supabase'
import type {
    Profile,
    SavedInspiration,
    InspirationMap,
    CommunityPost,
    Comment,
    Like,
    UserSession,
    InspirationTimeline
} from './supabase'

// 数据库操作类
export class DatabaseService {
    private client = createClient()

    // 检查客户端是否可用
    private checkClient() {
        if (!this.client) {
            throw new Error('Supabase 客户端未配置')
        }
        return this.client
    }

    // ==================== 用户配置相关 ====================

    /**
     * 获取用户配置
     */
    async getProfile(userId: string): Promise<Profile | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) {
            console.error('获取用户配置失败:', error)
            return null
        }

        return data
    }

    /**
     * 更新用户配置
     */
    async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single()

        if (error) {
            console.error('更新用户配置失败:', error)
            return null
        }

        return data
    }

    // ==================== 灵感收藏夹相关 ====================

    /**
     * 获取用户的灵感收藏
     */
    async getSavedInspirations(userId: string, category?: string): Promise<SavedInspiration[]> {
        const client = this.checkClient()
        let query = client
            .from('saved_inspirations')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (category) {
            query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) {
            console.error('获取灵感收藏失败:', error)
            return []
        }

        return data || []
    }

    /**
     * 保存灵感
     */
    async saveInspiration(inspiration: Omit<SavedInspiration, 'id' | 'created_at' | 'updated_at'>): Promise<SavedInspiration | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('saved_inspirations')
            .insert(inspiration)
            .select()
            .single()

        if (error) {
            console.error('保存灵感失败:', error)
            return null
        }

        return data
    }

    /**
     * 更新灵感
     */
    async updateInspiration(id: string, updates: Partial<SavedInspiration>): Promise<SavedInspiration | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('saved_inspirations')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            console.error('更新灵感失败:', error)
            return null
        }

        return data
    }

    /**
     * 删除灵感
     */
    async deleteInspiration(id: string): Promise<boolean> {
        const client = this.checkClient()
        const { error } = await client
            .from('saved_inspirations')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('删除灵感失败:', error)
            return false
        }

        return true
    }

    // ==================== 灵感图谱相关 ====================

    /**
     * 获取用户的灵感图谱
     */
    async getInspirationMaps(userId: string): Promise<InspirationMap[]> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('inspiration_maps')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('获取灵感图谱失败:', error)
            return []
        }

        return data || []
    }

    /**
     * 保存灵感图谱
     */
    async saveInspirationMap(map: Omit<InspirationMap, 'id' | 'created_at' | 'updated_at'>): Promise<InspirationMap | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('inspiration_maps')
            .insert(map)
            .select()
            .single()

        if (error) {
            console.error('保存灵感图谱失败:', error)
            return null
        }

        return data
    }

    /**
     * 更新灵感图谱
     */
    async updateInspirationMap(id: string, updates: Partial<InspirationMap>): Promise<InspirationMap | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('inspiration_maps')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            console.error('更新灵感图谱失败:', error)
            return null
        }

        return data
    }

    // ==================== 社区内容相关 ====================

    /**
     * 获取社区帖子
     */
    async getCommunityPosts(category?: string, limit = 20, offset = 0): Promise<CommunityPost[]> {
        const client = this.checkClient()
        let query = client
            .from('community_posts')
            .select('*, profiles(username, full_name, avatar_url)')
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (category) {
            query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) {
            console.error('获取社区帖子失败:', error)
            return []
        }

        return data || []
    }

    /**
     * 创建社区帖子
     */
    async createCommunityPost(post: Omit<CommunityPost, 'id' | 'likes_count' | 'comments_count' | 'views_count' | 'is_featured' | 'created_at' | 'updated_at'>): Promise<CommunityPost | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('community_posts')
            .insert(post)
            .select()
            .single()

        if (error) {
            console.error('创建社区帖子失败:', error)
            return null
        }

        return data
    }

    /**
     * 获取帖子详情
     */
    async getCommunityPost(id: string): Promise<CommunityPost | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('community_posts')
            .select('*, profiles(username, full_name, avatar_url)')
            .eq('id', id)
            .single()

        if (error) {
            console.error('获取帖子详情失败:', error)
            return null
        }

        return data
    }

    // ==================== 评论相关 ====================

    /**
     * 获取帖子评论
     */
    async getComments(postId: string): Promise<Comment[]> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('comments')
            .select('*, profiles(username, full_name, avatar_url)')
            .eq('post_id', postId)
            .order('created_at', { ascending: true })

        if (error) {
            console.error('获取评论失败:', error)
            return []
        }

        return data || []
    }

    /**
     * 创建评论
     */
    async createComment(comment: Omit<Comment, 'id' | 'likes_count' | 'created_at' | 'updated_at'>): Promise<Comment | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('comments')
            .insert(comment)
            .select()
            .single()

        if (error) {
            console.error('创建评论失败:', error)
            return null
        }

        return data
    }

    // ==================== 点赞相关 ====================

    /**
     * 添加点赞
     */
    async addLike(like: Omit<Like, 'id' | 'created_at'>): Promise<Like | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('likes')
            .insert(like)
            .select()
            .single()

        if (error) {
            console.error('添加点赞失败:', error)
            return null
        }

        return data
    }

    /**
     * 移除点赞
     */
    async removeLike(userId: string, targetType: string, targetId: string): Promise<boolean> {
        const client = this.checkClient()
        const { error } = await client
            .from('likes')
            .delete()
            .eq('user_id', userId)
            .eq('target_type', targetType)
            .eq('target_id', targetId)

        if (error) {
            console.error('移除点赞失败:', error)
            return false
        }

        return true
    }

    /**
     * 检查用户是否已点赞
     */
    async hasLiked(userId: string, targetType: string, targetId: string): Promise<boolean> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('likes')
            .select('id')
            .eq('user_id', userId)
            .eq('target_type', targetType)
            .eq('target_id', targetId)
            .single()

        if (error) {
            return false
        }

        return !!data
    }

    // ==================== 用户会话相关 ====================

    /**
     * 保存用户会话
     */
    async saveUserSession(session: Omit<UserSession, 'id' | 'created_at'>): Promise<UserSession | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('user_sessions')
            .insert(session)
            .select()
            .single()

        if (error) {
            console.error('保存用户会话失败:', error)
            return null
        }

        return data
    }

    /**
     * 获取用户会话
     */
    async getUserSessions(userId: string, sessionType?: string): Promise<UserSession[]> {
        const client = this.checkClient()
        let query = client
            .from('user_sessions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (sessionType) {
            query = query.eq('session_type', sessionType)
        }

        const { data, error } = await query

        if (error) {
            console.error('获取用户会话失败:', error)
            return []
        }

        return data || []
    }

    // ==================== 灵感时间线相关 ====================

    /**
     * 添加时间线事件
     */
    async addTimelineEvent(event: Omit<InspirationTimeline, 'id' | 'created_at'>): Promise<InspirationTimeline | null> {
        const client = this.checkClient()
        const { data, error } = await client
            .from('inspiration_timeline')
            .insert(event)
            .select()
            .single()

        if (error) {
            console.error('添加时间线事件失败:', error)
            return null
        }

        return data
    }

    /**
     * 获取用户时间线
     */
    async getTimeline(userId: string, eventType?: string): Promise<InspirationTimeline[]> {
        const client = this.checkClient()
        let query = client
            .from('inspiration_timeline')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (eventType) {
            query = query.eq('event_type', eventType)
        }

        const { data, error } = await query

        if (error) {
            console.error('获取时间线失败:', error)
            return []
        }

        return data || []
    }
}

// 导出单例实例
export const db = new DatabaseService() 