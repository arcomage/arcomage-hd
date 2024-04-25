pipeline {
    agent {
        label 'vm-agent'
    }    
    environment {
        CI = 'true'
        VERSION = '1.0.0'
        REPO_NAME = ''
    }
    stages {
        stage('Generate Release Tag') {
            steps {
                echo 'Generating release tag...'
                echo 'RELEASE TAG: $VERSION'
            }
        }
        
        stage('Install dependencies') {
            agent {
                docker {
                    image 'npm:16'
                    reuseNode true
                }
            }
            steps {
                echo 'Installing dependencies...'
                npm install
            }
        }
        
        stage('Generate Build') {
            agent {
                docker {
                    image 'npm:16'
                    reuseNode true
                }
            }
            steps {
                echo 'Generating build folder...'
                npm build
            }
        }

        stage('Run Tests') {
            agent {
                docker {
                    image 'npm:16'
                    reuseNode true
                }
            }
            steps {
                 echo 'Running Tests...'
                 npm test
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Extract repository name
                    REPO_NAME = extractRepositoryName()
                    echo "Generating ${REPO_NAME}:${VERSION} image..."
                    docker.build("${REPO_NAME}:${VERSION}", " .")
                }
            }
    }
}
}
def extractRepositoryName() {
    return sh(script: 'basename -s .git ${GIT_URL}', returnStdout: true).trim()
}