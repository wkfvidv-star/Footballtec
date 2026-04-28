import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import { MonitoringService } from './core/services/MonitoringService'

const app = createApp(App)

// Global Error Handler
app.config.errorHandler = (err, vm, info) => {
  MonitoringService.logError(err, { component: vm?.$options?.name, info })
}

// Performance Tracking
const startTime = performance.now()

app.use(createPinia())
app.use(router)

app.mount('#app')

MonitoringService.trackMetric('INITIAL_MOUNT', Math.round(performance.now() - startTime))
MonitoringService.logAction('APP_INITIALIZED', { version: '1.0.0-PROD' })
