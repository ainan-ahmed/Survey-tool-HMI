# Survey-tool-HMI

### Technologies

- Django
- Django REST
- ReactJS
- Docker

### Structure
```

Project/
|-- backend # Django API server
|-- frontend # ReactJS Frontend
```


## Run with docker

```

cd Survey-tool-HMI
docker-compose up --build

```

## Setup & Run with virtualenv

### Setup Virtualenv

Make sure you are using python>=3 and pip3

```

cd Survey-tool-HMI

# Install virtualenv
python3 -m pip install --user virtualenv

python3 -m venv env

# activate the virtualenv
source env/bin/activate

```

### Install Backend dependencies

```

# Install all python packages
pip3 install -r requirements.txt

# Verify packages are successfully installed
pip3 freeze

```

### Install Frontend dependencies
Make sure you have node and yarn installed, if not, refer to:
- [**Node Install Page**](https://nodejs.org/en/download/)
- [**Yarn Install Page**](https://legacy.yarnpkg.com/lang/en/docs/install/)
```
yarn install
yarn add react-scripts
```

### Run the Project

For development, we need to run both frontend and backend servers
```
cd frontend
yarn start
cd ..
cd backend
source env/bin/activate
python manage.py migrate
python manage.py runserver
