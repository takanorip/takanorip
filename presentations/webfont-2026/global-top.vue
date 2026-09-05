<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total } = useNav()

const visible = computed(() => currentPage.value > 1)
</script>

<template>
  <div v-if="visible" class="deck-chrome">
    <span class="meta tl"><i class="dot" />Web Fonts 2026 ｜ takanorip</span>
    <span class="meta tr">FEC KANSAI 2026</span>
    <div class="rule top" />
    <div class="rule bottom" />
    <span class="meta bl">今さら理解するウェブフォント2026</span>
    <span class="meta br">{{ currentPage }} / {{ total }}</span>
  </div>
</template>
