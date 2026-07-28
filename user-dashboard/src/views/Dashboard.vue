<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchUserTodos, fetchUserPosts } from '@/services/api'
import type { Todo } from '@/types/todos'
import type { Post } from '@/types/posts'


const props = defineProps<{ userId: number }>()

const todos = ref<Todo[]>([])
const posts = ref<Post[]>([])

onMounted(async () => {
  try {
    const [todosRes, postsRes] = await Promise.all([
      fetchUserTodos(props.userId),
      fetchUserPosts(props.userId)
    ])
    todos.value = todosRes.todos
    posts.value = postsRes.posts
  } catch (error) {
    console.error("Failed to load user dashboard data", error)
  }
})

// Computed stats for widgets
const completedTasksCount = computed(() => todos.value.filter(t => t.completed).length)
const pendingTasksCount = computed(() => todos.value.length - completedTasksCount.value)
</script>

<template>
  <div class="space-y-6">
    <!-- Top Statistics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-gray-400 font-medium text-sm">Pending Tasks</h3>
        <p class="text-3xl font-black text-black mt-2">{{ pendingTasksCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-gray-400 font-medium text-sm">Completed Tasks</h3>
        <p class="text-3xl font-black text-green-600 mt-2">{{ completedTasksCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-gray-400 font-medium text-sm">Total Posts</h3>
        <p class="text-3xl font-black text-blue-600 mt-2">{{ posts.length }}</p>
      </div>
    </div>

    <!-- Content Sections (Recent Posts & Tasks) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Todo Widget -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-xl font-bold text-black mb-4">My Tasks</h3>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div v-for="todo in todos.slice(0, 5)" :key="todo.id" class="flex items-center gap-3">
            <input type="checkbox" :checked="todo.completed" class="w-4 h-4 text-blue-600 rounded" />
            <span :class="todo.completed ? 'line-through text-gray-400' : 'text-gray-700'">
              {{ todo.todo }}
            </span>
          </div>
        </div>
      </div>

      <!-- Posts Widget -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-xl font-bold text-black mb-4">Recent Activity</h3>
        <div class="space-y-4 max-h-64 overflow-y-auto">
          <div v-for="post in posts.slice(0, 3)" :key="post.id" class="border-b border-gray-100 pb-3">
            <h4 class="font-bold text-gray-800 text-sm">{{ post.title }}</h4>
            <p class="text-gray-500 text-xs line-clamp-1 mt-1">{{ post.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>