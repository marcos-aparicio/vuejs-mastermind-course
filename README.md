# Introduction to Frontend Frameworks using VueJS


My own version of the final project of that ⬆  course from Mastermind.


### Development setup using docker

```bash
# clone the repo
git clone https://github.com/marcos-aparicio/vuejs-mastermind-course.git
cd vuejs-mastermind-course
echo '{"todos": [] }' > todolist-backend/db.json # creating the DB for the backend
# verify that the ports in .env make sense for your environment
docker compose up -d
# go to localhost on your frontend port(5173 by default)

```
