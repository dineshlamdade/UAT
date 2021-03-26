#Create image based on the official Node 10 image from dockerhub
FROM centos as web


RUN yum update -y
RUN yum install epel-release -y
RUN yum install nodejs -y
RUN yum install npm -y

#RUN yum install  ng-common 
#RUN npm install -g @angular/cli

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions


# Install dependecies

# Get all the code needed to run the app
COPY . /app/

#CMD ["sudo","npm","install","-g","@angular/cli@9.0.7"]
RUN npm install -g @angular/cli@9.0.7
#RUN npm install
RUN npm install --no-optional --no-shrinkwrap --no-package-lock
RUN npm i @angular-devkit/build-angular@0.901.9
RUN npm i @babel/compat-data@7.8.0
#RUN npm install
#RUN npm update
#RUN npm audit fix
#RUN npm update @angular/cli @angular/core

#RUN npm i @angular-devkit/build-angular@0.901.9

RUN npm run build --prod

#Stage 2
FROM nginx:alpine
COPY --from=web app/mysite.conf /etc/nginx/conf.d/default.conf
COPY --from=web app/dist/ /srv/mysite/
EXPOSE 80
