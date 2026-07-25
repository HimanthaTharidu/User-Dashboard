<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchUsers } from '@/services/api';
import type { User } from '@/types/user';
import UserCard from '@/components/UserCard.vue';
import UserModal from '@/components/UserModal.vue';

const search = ref("")
const users = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const showModal = ref(false)

function openModal(user: User) {
    selectedUser.value = user
    showModal.value = true // Ensure explicit true for modal visibility
}

function closeModal() {
    showModal.value = false
}

onMounted(async () => {
    try {
        const data = await fetchUsers()
        users.value = data.users;
    } catch (error) {
        console.error("Logic Error: Failed to load directory", error)
    } 
});

const filteredUsers = computed(() => {
    if (!search.value) return users.value

    const term = search.value.toLowerCase()
    return users.value.filter(u => 
        u.firstName.toLowerCase().includes(term) ||
        u.company?.department?.toLowerCase().includes(term)
    )
});
</script>

<template>
    <div class="max-w-7xl mx-auto p-6 pt-0">
        <div class="bg-gray-100 py-6">
            <h1 class="text-4xl font-black text-black mb-4">Employee Directory</h1>
            
            <div class="relative w-full max-w-md">
                <span class="absolute inset-y-0 left-4 flex items-center text-gray-400">🔍</span>
                <input 
                    v-model="search"
                    class="w-full pl-12 p-3 rounded-2xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Search employees..."
                />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-4">
            <UserCard
                v-for="user in filteredUsers" 
                :key="user.id"
                :user="user"
                @select="openModal"
            />
        </div>

        <p v-if="filteredUsers.length === 0" class="text-gray-500 mt-10 text-center text-lg">
            No users found matching "{{ search }}".
        </p>

        <UserModal
            v-if="showModal"
            :user="selectedUser"
            :key="selectedUser?.id"
            @close="closeModal"
        />    
    </div>
</template>