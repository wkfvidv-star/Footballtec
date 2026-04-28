# 🚀 Football Tec: Beta Launch & Monitoring Guide

Welcome to the **Launch Phase**. This document provides the necessary technical instructions to monitor, audit, and scale the Football Tec platform during your first user sessions.

---

## 📊 1. Monitoring User Activity
The system is equipped with the **MonitoringService**, which captures structured logs for all critical events.

### How to access logs:
During the Beta phase, logs are piped to the browser console with specific tags:
- `[MONITOR][ACTION]`: Track user portal switches, logins, and tactical exports.
- `[MONITOR][ERROR]`: Any runtime crashes or missing API nodes.
- `[MONITOR][PERF]`: Page load times and engine calculation latency.

> [!TIP]
> To export a full session log for analysis, run `window.monitoringService.getHistory()` in the browser console.

---

## 🛡️ 2. Security & RBAC Enforcement
The frontend enforces strict Role-Based Access Control (RBAC). 
- **Coach Portal**: Accessible only to accounts with the `COACH` role.
- **Player Portal**: Accessible only to accounts with the `PLAYER` role.
- **Gateway Lock**: Users cannot bypass the Portal Selection screen without a valid session.

> [!IMPORTANT]
> **Production Hardening**: Ensure your backend matches these role checks. The frontend `api.js` is already configured to handle `403 Forbidden` errors by redirecting users to the gateway.

---

## ⚡ 3. Performance Maintenance
The application uses **Atomic Initialization**. 
- Whenever a user returns to the **Gateway**, all internal stores (`training`, `iot`, `market`) are wiped clean.
- This prevents "State Bleeding" and ensures that multi-role users (e.g., a Coach who also has a Player profile) see isolated data.

---

## 🛠️ 4. Common Troubleshooting
| Issue | Potential Cause | Remedy |
| :--- | :--- | :--- |
| **Blank Screen on Switch** | Network interruption during Lazy Loading. | The `Suspense` layer will show a Skeleton. Check `Initial_Mount` logs. |
| **Old Data Appearing** | Store Reset failure. | Verify `globalReset` log in the console. |
| **Socket Disconnection** | Heartbeat failure. | `socketService` will attempt auto-reconnect on Auth change. |

---

## 🎯 5. Next Steps for SaaS Scaling
1. **External Monitoring**: Replace `MonitoringService.js` console logs with a Sentry DSN.
2. **Cloud Socket Node**: Move the `SocketService` to a dedicated microservice for handle >500 concurrent users.
3. **Database Backup**: Ensure your production DB has a 24h retention policy before the first 100 users.

**Good luck with the launch! The platform is now architecturally solid and production-ready.**
