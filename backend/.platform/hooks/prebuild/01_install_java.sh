#!/bin/bash
# Ensure Java 17 is available
yum update -y
yum install -y java-17-amazon-corretto-devel
alternatives --set java /usr/lib/jvm/java-17-amazon-corretto.x86_64/bin/java
alternatives --set javac /usr/lib/jvm/java-17-amazon-corretto.x86_64/bin/javac
export JAVA_HOME=/usr/lib/jvm/java-17-amazon-corretto.x86_64
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-amazon-corretto.x86_64' >> /etc/environment
