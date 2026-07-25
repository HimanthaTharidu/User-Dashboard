<script setup lang="ts">
import { watch, ref } from 'vue';
import { fetchUserPosts, fetchUserTodos } from '@/services/api';
import type { User } from '@/types/user';
import type { Todo } from '@/types/todos';
import type { Post } from '@/types/posts';

const props = defineProps<{ user: User | null }>();
const emit = defineEmits(['close']);

// State for tab switching
const activeTab = ref('Profile');
const todos = ref<Todo[]>([]);
const posts = ref<Post[]>([]);

watch(
  () => props.user,
  async (newUser) => {
    if (newUser) {
      try {
        const [postsResponse, todosResponse] = await Promise.all([
          fetchUserPosts(newUser.id),
          fetchUserTodos(newUser.id),
        ]);

        posts.value = postsResponse.posts;
        todos.value = todosResponse.todos;
      } catch (error) {
        console.error('Error fetching user resources:', error);
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="user"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="emit('close')"
  >
    <div class="bg-[#f3f4f6] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative">
      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-blue-600 hover:text-blue-800 text-2xl font-bold z-10"
      >
        ✕
      </button>

      <!-- Header Section -->
      <div class="p-8 pb-4 flex items-center gap-6">
        <img
          :src="user.image"
          class="w-24 h-24 rounded-full border-4 border-white shadow-sm"
          alt="Profile"
        />
        <div>
          <h2 class="text-4xl font-black text-black flex items-center gap-2">
            {{ user.firstName }} {{ user.lastName }}
            <span class="text-xl cursor-pointer">📝</span>
          </h2>
          <p class="text-gray-500 text-xl font-semibold">{{ user.company.title }}</p>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="px-8 flex gap-6 border-b border-gray-200">
        <button
          v-for="tab in ['Profile', 'Posts', 'Todos']"
          :key="tab"
          @click="activeTab = tab"
          class="pb-2 text-lg font-bold transition-colors relative"
          :class="activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'"
        >
          {{ tab }}
          <div
            v-if="activeTab === tab"
            class="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full"
          ></div>
        </button>
      </div>

      <!-- Content Area -->
      <div class="p-8 max-h-[500px] overflow-y-auto">
        <!-- Posts Tab -->
        <div v-if="activeTab === 'Posts'" class="space-y-4">
          <div v-for="post in posts" :key="post.id" class="border-b border-gray-200 pb-4">
            <h4 class="font-bold text-black text-lg">{{ post.title }}</h4>
            <p class="text-gray-500 line-clamp-2">{{ post.body }}</p>
          </div>
          <p v-if="posts.length === 0" class="text-center text-gray-400 italic">No posts found.</p>
        </div>

        <!-- Todos Tab -->
        <div v-else-if="activeTab === 'Todos'" class="space-y-4">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
          >
            <div
              class="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              :class="todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'"
            >
              <span v-if="todo.completed" class="text-white text-xs">✓</span>
            </div>
            <span
              class="text-lg font-medium"
              :class="todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'"
            >
              {{ todo.todo }}
            </span>
          </div>
          <p v-if="todos.length === 0" class="text-center text-gray-400 italic">No tasks found.</p>
        </div>

        <!-- Profile Tab -->
        <div v-else-if="activeTab === 'Profile'" class="space-y-6 text-lg">
          <section>
            <h3 class="font-bold text-black text-xl">ID Number</h3>
            <p class="text-gray-500 font-medium">{{ user.id}}</p>
          </section>

          <section>
            <h3 class="font-bold text-black text-xl">Department</h3>
            <p class="text-gray-500 font-medium">{{ user.company.department }}</p>
          </section>

          <section>
            <h3 class="font-bold text-black text-xl">Contact</h3>
            <p class="text-gray-500 font-medium italic">phone: {{ user.phone }}</p>
            <p class="text-gray-500 font-medium italic">email: {{ user.email }}</p>
          </section>

          <section>
            <h3 class="font-bold text-black text-xl">Office</h3>
            <p class="text-gray-500 font-medium">
              {{ user.company.address.address }}, {{ user.company.address.city }}
            </p>
          </section>

        </div>
      </div>
    </div>
  </div>
</template>