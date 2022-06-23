# Pull base image
FROM python:3

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /backend/code

# Install dependencies
COPY ./requirements.txt /backend/code/
RUN pip install -r requirements.txt


# Copy project
COPY . /backend/code/
