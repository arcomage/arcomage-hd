pipeline {
  agent {
    label '4gb-vm-agent'
  }

  tools {
    jfrog 'jfrog-cli'
  }

  environment {
    CI = 'true'
    VERSION = extractVersionNumber()
    REPO_NAME = extractRepositoryName()
    NODE_IMAGE = 'node:16'
    ARTIFACTORY_URL = 'demosiemensali.jfrog.io'
    ARTIFACTORY_USERNAME = credentials('JFrogUsername')
    ARTIFACTORY_PASSWORD = credentials('JFrogPassword')
    HOST_USERNAME = 'ubuntu'
    HOST_IP = '13.49.44.93'
    IMAGE_NAME = "$ARTIFACTORY_URL/$REPO_NAME/$REPO_NAME:$VERSION"
    APP_URL = "http://ec2-13-49-44-93.eu-north-1.compute.amazonaws.com"
  }

  stages {
    stage('Print Release Version') {
      steps {
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
            echo "Installing dependencies..."
            sh 'yarn install'
      }
      post{
        success{
            script{
                sh "sudo zip -r node_modules.zip node_modules"
                archiveArtifacts artifacts: 'node_modules.zip', followSymlinks: false
            }
        }
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
        sh 'yarn build'
      }
    }

    stage('Run Linting') {
      agent {
        docker {
          image "$NODE_IMAGE"
          reuseNode true
        }
      }
      steps {
        echo 'Running Linting...'
        sh 'yarn lint-staged'
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
        sh 'yarn test'
      }
      post {
        always {
            script {
              junit allowEmptyResults: true, testResults: 'junit.xml'
        }
      }
    }
    }

    stage('Build & Push Docker Image') {
      steps {
        script {
          sh "docker login -u \$ARTIFACTORY_USERNAME -p \$ARTIFACTORY_PASSWORD $ARTIFACTORY_URL"
          echo "Generating $IMAGE_NAME image..."
          sh "docker build -t $IMAGE_NAME ."
          sh "docker push $IMAGE_NAME"
        }
      }
    }

    stage('Deploy App') {
      steps {
        script {
def dockerComposeTemplate = """
services:
    {{ APP_NAME }}:
        image: {{ IMAGE_NAME }}
        ports:
        - "80:80"
"""
          def dockerCompose = dockerComposeTemplate.replaceAll('\\{\\{ APP_NAME \\}\\}', "$REPO_NAME").replaceAll('\\{\\{ IMAGE_NAME \\}\\}', "$IMAGE_NAME")
          echo "docker compose file: $dockerCompose"
          withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'HostKey', keyFileVariable: 'HOST_PRIVATE_KEY')]) {
          sh """ssh -i $HOST_PRIVATE_KEY -o StrictHostKeyChecking=no $HOST_USERNAME@$HOST_IP  << EOF
          docker login -u \$ARTIFACTORY_USERNAME -p \$ARTIFACTORY_PASSWORD $ARTIFACTORY_URL
          echo "$dockerCompose" > docker-compose.yaml
          docker compose up -d
          exit
          EOF"""
          }
        }
      }
    }

    stage('Status Test') {
      steps {
        script {
          echo "Making sure application is running..."
          def status = sh(script: "curl -Is $APP_URL | head -1 | cut -d' ' -f2", returnStdout: true).trim()
          if (status != '200') {
            error "ERROR: Application is not running on $APP_URL"
          } else {
            echo "Application is up and running. APPLICATION URL: $APP_URL"
          }
        }
      }
    }
    stage('Push Artifacts') {
      steps {
        script {
              jf 'c show'
              jf 'rt ping'
              def jfrogTestResultsDirectory = "test-results-artifacts"
              def jfrogModulesDirectory="node-modules-artifacts"
              def jfrogBuildsDirectory="build-artifacts"
              sh "sudo cp junit.xml junit_$BUILD_NUMBER.xml"
              echo "Uploading test results to JFrog..."
              jf "rt u junit_$BUILD_NUMBER.xml /$jfrogTestResultsDirectory"
              //jf "rt u node_modules/* /$jfrogModulesDirectory"
              sh "sudo zip -r dist_$VERSION.zip"
              jf "rt u dist_$VERSION.zip /$jfrogBuildsDirectory"
              jf 'rt bp'
        }
      }
    }
  }
  post {
    success {
        script {
          def committerEmail = sh(script: 'git log --format="%ae" | head -1', returnStdout: true).trim()
          echo "Subject: Jenkins Build Success: ${currentBuild.fullDisplayName}"
          echo "Body: The Jenkins build ${currentBuild.fullDisplayName} succeeded. Build URL: ${BUILD_URL}"
          echo "Recipient: ${committerEmail}"
          emailext(
            subject: "Jenkins Build Success: ${currentBuild.fullDisplayName}",
            body: "The Jenkins build ${currentBuild.fullDisplayName} succeeded. Build URL: ${BUILD_URL}",
            to: "${committerEmail}",
          )
        }
    }
    failure {
        script {
          def committerEmail = sh(script: 'git log --format="%ae" | head -1', returnStdout: true).trim()
          echo "Subject: Jenkins Build Failure: ${currentBuild.fullDisplayName}"
          echo "Body: The Jenkins build ${currentBuild.fullDisplayName} failed. Build URL: ${BUILD_URL}"
          echo "Recipient: ${committerEmail}"
          emailext(
            subject: "Jenkins Build Failed: ${currentBuild.fullDisplayName}",
            body: "The Jenkins build ${currentBuild.fullDisplayName} failed. Build URL: ${BUILD_URL}",
            to: "${committerEmail}",
          )
        }
    }
  }

}

def extractRepositoryName() {
  return sh(script: 'basename -s .git ${GIT_URL}', returnStdout: true).trim()
}
def extractVersionNumber() {
  def packageJson = readJSON file: 'package.json'
  return packageJson.version
}
def hasFileChanged(file) {
  def currentCommit = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
  def previousCommit = sh(script: 'git rev-parse HEAD^', returnStdout: true).trim()

  def diffCommand = "git diff --name-only ${previousCommit} ${currentCommit}"
  def diffOutput = sh(script: diffCommand, returnStdout: true).trim()

  return diffOutput.contains(file)
}