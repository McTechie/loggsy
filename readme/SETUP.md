# Loggsy Setup Guide

> This guide will help you setup Loggsy on your local machine.
> 
> I have used MacOS for the development of Loggsy, so the commands may differ for other operating systems.

### Prerequisites (Exact versions used in development)

- [ ] Python 3.10.6
  - [Download from here](https://www.python.org/downloads/)
- [ ] Node.js 16.14.2
  - [Download from here](https://nodejs.org/en/download/)

---

### Frontend

- [ ] Install pnpm (Package Manager)

> You can use npm or yarn as well, but I prefer to use pnpm

```bash
npm install -g pnpm
```

- [ ] Install dependencies

```bash
cd client
pnpm install
```

- [ ] Run the development server

```bash
pnpm dev
```

---

### Backend

- [ ] Install virtualenv

```bash
python3 -m pip install virtualenv
```

- [ ] Create a virtual environment

```bash
cd server
python3 -m venv venv
```

- [ ] Activate the virtual environment

```bash
source venv/bin/activate
```

- [ ] Install dependencies

```bash
python3 -m pip install -r requirements.txt
```

- [ ] Run the development server

```bash
python3 manage.py runserver
```
