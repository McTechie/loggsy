# Loggsy Setup Guide

> This guide will help you setup Loggsy on your local machine.
> 
> I have used MacOS for the development of Loggsy, so the commands may differ for other operating systems.

---

<details>
<summary>Prerequisites</summary>

<br>

### Node.js (Frontend)

> I've also mentioned the Exact version used in development

- [ ] Node.js v16.14.2
  - [Download from here](https://nodejs.org/en/download/)

### Python (Backend)

> I've also mentioned the Exact version used in development

- [ ] Python v3.10.6
  - [Download from here](https://www.python.org/downloads/)

### Clone the repository

> You can also download the repository as a zip file and extract it

- [ ] Clone the repository

```bash
git clone https://github.com/McTechie/loggsy/loggsy
```

### Setting up the environment variables

<details>
<summary>Frontend</summary>

- [ ] Rename the `.env.example` file to  `.env.local` file in the `client` directory

- [ ] Replace `<backend_url_here>` with the URL of your backend server

> If you intend to run the backend server on your local machine, then use `http://localhost:8000` as the backend URL

</details>

<details>
<summary>Backend</summary>

- [ ] Create a `.env` file in the `server/server` directory

```bash
# For MacOS
cd server/server
touch .env

# For Windows
cd server\server
type nul > .env
```

- [ ] Copy the following code and paste it in the `.env` file

```env
DATABASE_NAME=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
```

- [ ] Replace the values with the credentials of your PostgreSQL database

</details>

---

<details>
<summary>MacOS</summary>

<br>

### Frontend

- [ ] Install pnpm (Package Manager)

> You can use `npm` or `yarn` as well, but I have used `pnpm`

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

> **Method 1: Using a virtual environment (Preferred)**

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

- [ ] Open the browser and go to `http://localhost:8000` to verify that the server is running

- [ ] To stop the server, Press `Ctrl + C` in the terminal where the server is running

- [ ] Finally, deactivate the virtual environment by running the following command

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

- [ ] Open the browser and go to `http://localhost:8000` to verify that the server is running

- [ ] To stop the server, Press `Ctrl + C` in the terminal where the server is running

</details>

---

<details>
<summary>Windows</summary>

<br>

### Frontend

- [ ] Install pnpm (Package Manager)

> You can use `npm` or `yarn` as well, but I have used `pnpm`

```cmd
npm install -g pnpm
```

- [ ] Install dependencies

```cmd
cd client
pnpm install
```

- [ ] Run the development server

```cmd
pnpm dev
```

- [ ] Open the browser and go to `http://localhost:3000`

- [ ] To stop the server, Press `Ctrl + C` in the terminal where the server is running

---

### Backend

> **Method 1: Using a virtual environment (Preferred)**

- [ ] Create a virtual environment

```cmd
cd server
python -m venv venv
```

- [ ] Activate the virtual environment

```cmd
venv\Scripts\activate
```

- [ ] Install dependencies

```cmd
pip install -r requirements.txt
```

- [ ] Run the Django development server

```cmd
python manage.py runserver
```

- [ ] Open the browser and go to `http://localhost:8000` to verify that the server is running

- [ ] To stop the server, Press `Ctrl + C` in the terminal where the server is running

- [ ] Finally, deactivate the virtual environment by running the following command

```bash
deactivate
```

> **Method 2: Without using a virtual environment**

- [ ] Install dependencies

```cmd
cd server
pip install -r requirements.txt
```

- [ ] Run the Django development server

```cmd
python manage.py runserver
```

- [ ] Open the browser and go to `http://localhost:8000` to verify that the server is running

- [ ] To stop the server, Press `Ctrl + C` in the terminal where the server is running

</details>

---

