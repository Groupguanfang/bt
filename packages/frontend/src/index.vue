<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="tsx">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

if (route.path === '/') router.push('/servers')
</script>
