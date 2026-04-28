<template>
  <div class="space-y-8 animate-pulse" dir="rtl">
    <header class="flex justify-between items-end">
      <div class="space-y-3">
        <div class="h-10 w-64 bg-white/10 rounded-lg"></div>
        <div class="h-4 w-48 bg-white/5 rounded-md"></div>
      </div>
      <div class="h-10 w-32 bg-white/10 rounded-full"></div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-3 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div v-for="i in 3" :key="i" class="h-64 bg-white/5 rounded-3xl border border-white/5"></div>
        </div>
        <div class="h-96 bg-white/5 rounded-3xl border border-white/5"></div>
      </div>
      <div class="lg:col-span-1 space-y-6">
        <div v-for="i in 3" :key="i" class="h-40 bg-white/5 rounded-2xl border border-white/5"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No-logic presentation component for V13 Loading States
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
</style>
