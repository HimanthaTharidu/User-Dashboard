<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import { fetchUsers } from '@/services/api';
import type { User } from '@/types/user';
import UserCard from '@/components/UserCard.vue';
import UserModel from '@/components/UserModel.vue';

const search = ref("")
const users = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const isModalOpen = computed(() => !!selectedUser.value)

onMounted(async () => {
    try{
        const data = await fetchUsers()
        users.value = data.users;
    }catch(error){
        console.error("Logic Error: Failed to load directory", error)
    } 
});

const filterdUsers = computed(() => {
  return users.value.filter(u => 
  u.firstName.toLowerCase().includes(search.value.toLowerCase()))
})


</script>

<template>
    <div>
        <h1>User Dashboard</h1>
        <div>
            <input
            v-model="search"
            placeholder="Search users...">

            <div>
                <UserCard
                v-for="user in filterdUsers" 
                :key="user.id"
                :user="user"
                @select="selectedUser = $event"
                />
                <UserModel
                :user="selectedUser"
                @close="selectedUser = null"
                />
            </div>
        </div>
    </div>
</template>
<style>
</style>