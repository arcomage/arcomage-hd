pipeline {
  agent {
    label '4gb-vm-agent'
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
                archiveArtifacts artifacts: 'node_modules/**', followSymlinks: false
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
        script{
          if(!fileExists("node_modules"))
          {
            sh "yarn install"
          }
        }
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
          script{
          if(!fileExists("node_modules"))
          {
            sh "yarn install"
          }
        }
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
        script{
          if(!fileExists("node_modules"))
          {
            sh "yarn install"
          }
        }
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
      when {
        branch 'main'
      }
      steps {
        script {
          sh "docker login -u \$ARTIFACTORY_USERNAME -p \$ARTIFACTORY_PASSWORD $ARTIFACTORY_URL"
          echo "Generating $IMAGE_NAME image..."
          if (fileExists("dist")){
          echo "Build folder found, building from nginx Dockerfile..."
           sh "docker build -t $IMAGE_NAME ."           
          }
          else{
          echo "Build folder not found, building from multistaged Dockerfile..."
          sh "docker build -t $IMAGE_NAME -f Dockerfile.multistage ."
          }
          sh "docker push $IMAGE_NAME"
        }
      }
    }

    stage('Deploy App') {
      when {
        branch 'main'
      }
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
      when {
        branch 'main'
      }
      steps {
        script {
          echo "Making sure application is running after new deployment..."
          def status = sh(script: "curl -Is $APP_URL | head -1 | cut -d' ' -f2", returnStdout: true).trim()
          if (status != '200') {
            error "ERROR: Application is not running on $APP_URL"
          } else {
            echo "Application is up and running. APPLICATION URL: $APP_URL"
          }
        }
      }
    }

    stage('Create Release Tag') {
      when {
        branch 'main'
      }
      steps {
        echo "RELEASE TAG: $VERSION"
        sh "git tag -f $VERSION"
        sh "git push -f origin --tags"
      }
    }


    stage('Push Artifacts') {
      tools {
          jfrog 'jfrog-cli'
      }
      steps {
        script {
              jf 'c show'
              jf 'rt ping'
              def jfrogTestResultsDirectory = "test-results-artifacts"
              def jfrogBuildsDirectory="build-artifacts"
              def builds_tag="${REPO_NAME}_${GIT_BRANCH}_${VERSION}"
              def tests_tag="${REPO_NAME}_${GIT_BRANCH}_${BUILD_NUMBER}"
              def test_results_file = "junit.xml"
              def jfrog_tests_file = "junit_${tests_tag}.xml"
              def build_folder = "dist"
              def jfrog_build_archive = "dist_${builds_tag}.zip"
              if (fileExists(test_results_file)){
              echo "Uploading $jfrog_tests_file test results file to JFrog..."
              sh "cp $test_results_file $jfrog_tests_file"
              jf "rt u $jfrog_tests_file /$jfrogTestResultsDirectory"
              }
              if (fileExists(build_folder)){
              echo "Uploading $jfrog_build_archive build archive to JFrog..."
              sh "zip -r $jfrog_build_archive $build_folder"
              }
              jf "rt u $jfrog_build_archive /$jfrogBuildsDirectory"
              jf 'rt bp'
        }
      }
    }
  }

  post {
    success {
        script {
          def committerEmail = sh(script: 'git log --format="%ae" | head -1', returnStdout: true).trim()
          echo "Receiver Email: $committerEmail"
          echo "Subject: Jenkins Build Success: ${currentBuild.fullDisplayName}"
          echo "Body: The Jenkins build ${currentBuild.fullDisplayName} succeeded. Build URL: ${BUILD_URL}"
          emailext(
            subject: "Jenkins Build Success: ${currentBuild.fullDisplayName}",
            body: "The Jenkins build ${currentBuild.fullDisplayName} succeeded. Build URL: ${BUILD_URL}",
            to: "$committerEmail",
          )
        }
    }
    failure {
        script {
          def committerEmail = sh(script: 'git log --format="%ae" | head -1', returnStdout: true).trim()
          echo "Receiver Email: $committerEmail"
          echo "Subject: Jenkins Build Failure: ${currentBuild.fullDisplayName}"
          echo "Body: The Jenkins build ${currentBuild.fullDisplayName} failed. Build URL: ${BUILD_URL}"
          emailext(
            subject: "Jenkins Build Failed: ${currentBuild.fullDisplayName}",
            body: "The Jenkins build ${currentBuild.fullDisplayName} failed. Build URL: ${BUILD_URL}",
            to: "$committerEmail",
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
def pipelineIsManuallyTriggered(){
  return currentBuild.rawBuild.getCause(hudson.model.Cause$UserIdCause)
}