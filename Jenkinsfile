pipeline {
    agent {
        label 'vm-agent'
    }    
    environment {
        CI = 'true'
        VERSION = '1.0.0'
        REPO_NAME = ''
        NODE_IMAGE = 'node:16'
    }
    stages {
        stage('Generate Release Tag') {
            steps {
                echo 'Generating release tag...'
                echo "RELEASE TAG: $VERSION"
            }
        }
        
        stage('Install dependencies') {
            agent {
                docker {
                    image "$NODE_IMAGE"
                    reuseNode true
                }
            }
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Generate Build') {
            agent {
                docker {
                    image "$NODE_IMAGE"
                    reuseNode true
                }
            }
            steps {
                echo 'Generating build folder...'
                sh 'npm build'
            }
        }

        stage('Run Tests') {
            agent {
                docker {
                    image "$NODE_IMAGE"
                    reuseNode true
                }
            }
            steps {
                 echo 'Running Tests...'
                 sh 'npm test'
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