#### Tech Stacks

Frontend

* React

* shadCN

Backend

* Hono

* Drizzle ORM

#### Installation

### 1. Clone this repository

```
git remote add [origin] https://github.com/Siraj-Abdulkadir/drizzle-assignment.git
```

### 2. Navigate to the Project Directory

Move into the folder created by the clone command:

```
cd my_app
```

### 3. Install dependacies

```
bun install
```

### 4. Environment Configuration

create a `.env` file in the root directory and add the this key:

Bash

```
touch .env
```

after creating .env file:

> > > ```dotenv
> > > DB_FILE_NAME=file:local.db
> > > ```

### 5. Run the Backend

To start the development server with Hot Module Replacement (HMR):

Bash

```
bun run dev
```

#### 6. Install the frontend

install front end depencencies by opening new terminal:

Bash

```
cd frontend;
bun install;
```

### 7. Run the frontend

once the backend is running you can run the frontend as well

Bash

```
bun run dev
```
