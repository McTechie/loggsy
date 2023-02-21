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

- [ ] Open the browser and go to `http://localhost:3000`

- [ ] To stop the server, Press `Ctrl + C` in the terminal where the server is running

---

### Backend

> **Method 1: Using a virtual environment**

- [ ] Install virtualenv (Skip if you have already installed it)

```bash
pip3 install virtualenv
```

- [ ] Create a virtual environment

```bash
cd server
virtualenv venv
```

- [ ] Activate the virtual environment

```bash
source venv/bin/activate
```

- [ ] Install dependencies

```bash
pip3 install -r requirements.txt
```

- [ ] Run the Django development server

```bash
python3 manage.py runserver
```

- [ ] To stop the server, Press `Ctrl + C` in the terminal where the server is running

- [ ] To deactivate the virtual environment, run the following command

```bash
deactivate
```

> **Method 2: Without using a virtual environment**

- [ ] Install dependencies

```bash
cd server
pip3 install -r requirements.txt
```

- [ ] Run the Django development server

```bash
python3 manage.py runserver
```

- [ ] To stop the server, Press `Ctrl + C` in the terminal where the server is running
