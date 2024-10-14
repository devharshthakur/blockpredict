# BlockPredict Scripts

# 🚀 BlockPredict Project Scripts

This directory contains scripts utilized in the BlockPredict project.

## 📋 Overview

The scripts in this directory serve the following purposes:

- 🧪 Testing and verifying various functionalities for personel use.
- 📜 Generating specific logs for personel devolopment purposes.
- 👩‍💻 Intended solely for development by individual developers.
- 🚫 Not suitable for production environments.
- 💡 Developers are encouraged to add their own scripts for development or debugging.
- 🔒 Changes should not be included in version control.
- 🔄 Maintain the original state of this directory as in the upstream.

## 📝 Script: `checkOwner.js`

### 📖 Description

The `checkOwner.js` script verifies the ownership of a specified block by checking its metadata to ensure the owner information is accurate and current.

### 🛠️ Usage

To execute the `checkOwner.js` script, use the following command:

```bash
node checkOwner.js <blockId>
```

Replace `<blockId>` with the ID of the block you wish to verify.

#### 💡 Example

```bash
node checkOwner.js 12345
```

This command will verify the ownership of the block with ID `12345`.

### 📦 Dependencies

Ensure all necessary dependencies are installed before running the script. Install them using:

```bash
npm install
```

### 📝 Notes

- 🔄 Regularly update block metadata to maintain accurate ownership information.
- ⚠️ Handle any errors or exceptions that may occur during script execution.

> Soon I will create a typescript environment so that you can write the code in typescript 