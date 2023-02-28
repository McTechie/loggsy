# Loggsy Backend

### Project Structure

- `server` - Django project directory
  - `server` - Django root app
    - `settings.py` - Django settings
    - `urls.py` - Django root urls file
  - `sandbox_api` - Sandbox app
    - `urls.py` - Sandbox urls file
    - `views.py` - Sandbox views file
  - `logs_api` - Main app for logs
    - `urls.py` - Logs urls file
    - `views.py` - Logs views file
    - `models.py` - Logs models file
    - `serializers.py` - Serializers file
    - `exceptions.py` - Cusotm exceptions file
    - `utils.py` - Utility functions file
  - `manage.py` - Django manage script
  - `requirements.txt` - Python dependencies

### Packages Used

- [x] psycopg2 (for PostgreSQL)
- [x] django-environ (for environment variables)
- [x] djangorestframework (Backend APIs)
- [x] gunicorn (for deployment)
- [x] django-cors-headers (CORS)

### API Endpoints

> [API Documentation](../docs/API.md)

### Database Schema

> [Database Schema](../docs/SCHEMA.md)
