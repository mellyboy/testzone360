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
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Frontend Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Verify Build and Backend Directories') {
            steps {
                sh 'ls -la build'
                sh 'ls -la backend'
            }
        }
        stage('Deploy') {
            steps {
                
                // Copy the entire build folder to /var/www/html
                sh 'cp -r build/* /var/www/html/'
                
                // Copy the entire backend folder to /var/www/html/api
                sh 'cp -r backend/* /var/www/html/api'
                
                // Restart Nginx to apply the changes
                sh 'systemctl restart nginx'
            }
        }
    }
}
