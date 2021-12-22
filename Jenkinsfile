node {

  stage 'checkout scm'
  checkout scm

  stage 'Docker build Web'
  dir("${env.WORKSPACE}/") {
    docker.build('paysquare/test-deliziahrnewui')
    
    }

  stage 'Docker push Web'
  docker.withRegistry('', 'dockerhubaccount') {
    docker.image('paysquare/test-deliziahrnewui').push("${BUILD_NUMBER}")
    docker.image('paysquare/test-deliziahrnewui').push('Latest')
    }

  stage('Remove Unused docker image') {
  sh ("echo y | docker system prune")
  }
  
}

