pipeline {
    agent any

environment {
        PATH = "/usr/bin:$PATH"
        mvnHome= tool name: 'Maven_Paysquare', type: 'maven'
        jdk = tool name: 'java', type: 'jdk'
        JAVA_HOME = "${jdk}"
        EMAIL_TO = 'agileteam@paysquare.com'
        

}
    stages {
	
	stage('Welcome Mail') {
            steps {

emailext body: 'Starting: $PROJECT_NAME - #$BUILD_NUMBER', subject: 'Starting: $PROJECT_NAME - #$BUILD_NUMBER', to: 'agileteam@paysquare.com'
}
}
//============================================================================================
	
        stage('Git Pull') {
            steps {
       git branch: 'dev', credentialsId: 'Bitbuicket-login', url: 'https://paysquareltd@bitbucket.org/paysquareltd/deliziahr-newui.git'}
        }
//============================================================================================
 
        //stage('Build') {
           // steps {

           // sh "${mvnHome}/bin/mvn clean package"
                
           // }

       // }
//============================================================================================        
          stage('Create Docker') {
            steps {

      sh  "docker build -t paysquare/deliziahrnewui  -f Dockerfile ."
      sh "docker tag paysquare/deliziahrnewui paysquare/deliziahrnewui"
	  sh "docker tag paysquare/deliziahrnewui paysquare/deliziahrnewui:$BUILD_NUMBER"
            }

        }
//============================================================================================        
           stage('Docker Login') {
            steps {
                withCredentials([string(credentialsId: 'testdocker', variable: 'PASSWORD')]) {
                            sh 'docker login -u paysquare -p ${PASSWORD}'

            }

        }}
//============================================================================================        
         stage('Push Image to Docker Hub') {
            steps {
                
       
		sh 'docker push paysquare/deliziahrnewui:latest'
		sh 'docker push paysquare/deliziahrnewui:$BUILD_NUMBER'
        
            }

        }
//============================================================================================        
           stage('Run Docker') {
            steps {
                
        sshPublisher(publishers: [sshPublisherDesc(configName: 'Delizia-Dev', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'sudo sh /root/script/deliziahrnewui.sh', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }

        }
//============================================================================================        
  
        
    }
        
       
post {
        failure {
            emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                    to: "${EMAIL_TO}", 
                    subject: 'Build failed in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        unstable {
            emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                    to: "${EMAIL_TO}", 
                    subject: 'Unstable build in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        success {
            emailext body: 'Check console output at $BUILD_URL to view the results.', 
                    to: "${EMAIL_TO}", 
                    subject: 'success: $PROJECT_NAME - #$BUILD_NUMBER'
                
        }
    }
}

