# Loggsy Database Schema

### Logs Table

| Column | Type | Description |
| :---: | :---: | :---: |
| id | Integer | ID of the log |
| timestamp | DateTime | Timestamp of the log |
| severity | Integer | Severity of the log |
| source | String | Source of the log |
| message | String | Message of the log |

---

### Example Log Record

```log
id: 1
timestamp: 2023-01-20 00:00:00
severity: 5
source: Server
message: API /xyz could not be reached
```

---

### Severity Levels Used

| Level | Description |
| :---: | :---: |
| 1 | TRACE |
| 2 | DEBUG |
| 3 | INFO |
| 4 | WARN |
| 5 | ERROR |
| 6 | FATAL |
