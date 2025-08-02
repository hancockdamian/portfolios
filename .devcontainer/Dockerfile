FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:24

USER root
RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    neofetch \
    && apt-get clean

# Install Git Credential Manager for AMD64
RUN wget https://github.com/git-ecosystem/git-credential-manager/releases/download/v2.6.1/gcm-linux_amd64.2.6.1.deb \
    && dpkg -i gcm-linux_amd64.2.6.1.deb \
    && git-credential-manager configure \
    && rm gcm-linux_amd64.2.6.1.deb

RUN git config --system credential.helper manager

USER node
