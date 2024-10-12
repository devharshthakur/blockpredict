# BlockPredict Project

Welcome to the **BlockPredict** project! This README provides an overview of the project, its structure, and how to get started. 🚀

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**BlockPredict** is a  blockchain prediction simulation project designed to simulate ho predictions do with chage of weights. The project leverages advanced algorithms and data analysis techniques to offer insights and forecasts.It sotre weights in a BlockChain Network

## Features

✨ **Accurate Predictions**: Utilizing state-of-the-art algorithms to provide reliable blockchain predictions.

🔗 **Blockchain Integration**: Seamless integration with blockchain networks.

## Project Structure

Here's an overview of the project's structure:

```plaintext
blockpredict/
├── blockchain/            # Blockchain-related code and smart contracts
│   ├── contracts/         # Smart contracts
│   ├── scripts/           # Deployment and interaction scripts
│   └── tests/             # Tests for smart contracts
├── blockchain-service/    # Services related to blockchain interactions
├── client/                # Frontend client application(In Next Js)
│   ├── src/               # Source code for the client
│   └── public/            # Public assets
├── server/                # Backend server application
│   ├── src/               # Source code for the server
│   └── tests/             # Tests for the server
├── shared/                # Shared resources and libraries
│   ├── assets/            # Shared assets like images and stylesheets
│   ├── libs/              # Shared libraries and utilities
│   └── docs/              # Documentation
└── pnpm-workspace.yaml    # pnpm workspace configuration
```

## Installation

To get started with the BlockPredict project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/devharshthakur/blockpredict.git
    cd blockpredict
    ```

2. **Install dependencies**: We use `pnpm` as our package manager for its speed and efficiency.
    ```bash
    pnpm install
    ```

## Usage

### Running the Client

To start the frontend client application:

```bash
cd client
pnpm start
```

### Running the Server

To start the backend server application:

```bash
cd server
pnpm start:dev # to start in devolopment(watch) mode
```

### Running Blockchain Scripts

To deploy and interact with smart contracts:

```bash
cd blockchain
pnpm hardhat node
# In a diff terminal
pnpm hardhat run scripts/deploy.js
```

## Contributing

We welcome contributions from the community! Please read our contributing guidelines to get started.

**Note:** The `CONTRIBUTING.md` file is coming soon. Stay tuned for updates!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using BlockPredict! If you have any questions or need further assistance, feel free to open an issue or contact us. 😊
