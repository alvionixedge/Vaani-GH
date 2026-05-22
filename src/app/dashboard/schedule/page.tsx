'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface ScheduledPost {
  id: string
  content: string
  platform: string
  scheduled_time: string
  status: string
}

export default function SchedulePage() {
  const [content, setContent] = useState('')
  const [platform, setPlatform] = useState<'instagram' | 'facebook'>('instagram')
  const [scheduledTime, setScheduledTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    loadScheduledPosts()
  }, [])

  const loadScheduledPosts = async () => {
    try {
      setLoadingPosts(true)
      const response = await fetch('/api/schedule')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      toast.error('Failed to load scheduled posts')
    } finally {
      setLoadingPosts(false)
    }
  }

  const handleSchedule = async () => {
    if (!content.trim()) {
      toast.error('Please enter content')
      return
    }
    if (!scheduledTime) {
      toast.error('Please select a date and time')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          platform,
          scheduled_time: new Date(scheduledTime).toISOString(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to schedule post')
      }

      toast.success('Post scheduled!')
      setContent('')
      setScheduledTime('')
      loadScheduledPosts()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (postId: string) => {
    try {
      const response = await fetch(`/api/schedule/${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to cancel post')
      }

      toast.success('Post cancelled')
      loadScheduledPosts()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Schedule Posts</h1>
        <p className="text-gray-600 mt-2">Schedule content to post on Instagram or Facebook</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">New Schedule</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              >
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Time
              </label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSchedule}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Scheduling...' : 'Schedule Post'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Scheduled Posts</h2>

        {loadingPosts ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No scheduled posts yet</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(post.status)}`}>
                      {post.status}
                    </span>
                    <span className="text-sm text-gray-600">{post.platform.toUpperCase()}</span>
                  </div>
                  <p className="text-gray-900 mb-2">{post.content}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.scheduled_time).toLocaleString()}
                  </p>
                </div>
                {post.status === 'PENDING' && (
                  <button
                    onClick={() => handleCancel(post.id)}
                    className="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
