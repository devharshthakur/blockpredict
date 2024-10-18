# Contributing to BlockPredict

Thank you for considering contributing to the **BlockPredict** project! Your contributions are highly appreciated. This document provides guidelines and instructions to help you get started. 🚀

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Setup](#development-setup)
- [Style Guides](#style-guides)
    - [Git Commit Messages](#git-commit-messages)
    - [Code Style](#code-style)
- [License](#license)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for everyone. 🌟

## How to Contribute

### Reporting Bugs

If you find a bug, please report it by opening an issue on our [GitHub Issues](https://github.com/devharshthakur/blockpredict/issues) page. Include as much detail as possible to help us diagnose and fix the issue quickly. 🐛

### Suggesting Enhancements

We welcome suggestions for new features and improvements! To suggest an enhancement, please open an issue on our [GitHub Issues](https://github.com/devharshthakur/blockpredict/issues) page. Provide a clear and detailed description of the enhancement and its benefits. 💡

### Submitting Pull Requests

1. **Fork the repository**: Click the "Fork" button on the top right corner of the repository page.
2. **Clone your fork**: 
        ```bash
        git clone https://github.com/devharshthakur/blockpredict.git
        cd blockpredict
        ```
3. **Create a new branch**: 
        ```bash
        git checkout -b feature/your-feature-name
        ```
4. **Make your changes**: Implement your feature or fix the bug.
5. **Commit your changes**: 
        ```bash
        git commit -m "Add feature/fix: Description of your changes"
        ```
6. **Push to your fork**: 
        ```bash
        git push origin feature/your-feature-name
        ```
7. **Open a pull request**: Go to the original repository and click the "New Pull Request" button. Provide a clear description of your changes and any related issues.

## Development Setup

To set up your development environment, follow these steps:

1. **Clone the repository**:
        ```bash
        git clone https://github.com/devharshthakur/blockpredict.git
        cd blockpredict
        ```
2. **Install dependencies**: We use `pnpm` as our package manager.
        ```bash
        pnpm install
        ```
3. **Run the project**:
        - **Client**:
                ```bash
                cd client
                pnpm dev
                ```
        - **Server**:
                ```bash
                cd server
                pnpm start:dev
                ```
        - **Blockchain**:
                ```bash
                cd blockchain
                pnpm hardhat node
                # In a different terminal to deploy the contract
                pnpm hardhat run scripts/deploy.js
                ```

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally.

### Code Style

- Follow the existing code style in the project.Apply prettier on all the folders before commiting
- Use meaningful variable and function names.
- Write comments to explain the code, for better understanding and workflow

## License

By contributing to BlockPredict, you agree that your contributions will be licensed under the [MIT License](LICENSE). 📜

---

Thank you for your contributions! If you have any questions or need further assistance, feel free to open an issue or contact us. 😊