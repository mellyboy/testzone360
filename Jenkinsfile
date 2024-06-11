pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/mellyboy/testzone360.git', credentialsId: 'github-pat'
            }
        }
        stage('Backend Build') {
            steps {
                dir('testzone360/backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Frontend Build') {
            steps {
                dir('testzone360/frontend') {
                    sh 'npm install && npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'cp -r testzone360/build /var/www/html'
                sh 'cp -r testzone360/backend /var/www/html/api'
                
                sh 'sudo systemctl restart nginx'
            }
        }
    }
}
