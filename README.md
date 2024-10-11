# MongoDB Data Migration Tool

This tool is designed to migrate data from one MongoDB collection to another, potentially across different databases or even different MongoDB instances. It is written in TypeScript.

## Features

- Reads data from a source MongoDB collection
- Writes data to a target MongoDB collection
- Configurable source and target connections
- Environment variable support for secure configuration
- Error logging and informational logging
- TypeScript support for better type safety and developer experience

## Prerequisites

- Node.js (version 12 or higher recommended)
- npm (Node Package Manager)
- Access to source and target MongoDB instances

## Installation

1. Clone this repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.

## Configuration

Create a `.env` file in the root directory of the project with the following variables:

```
SOURCE_URL=mongodb://source_host:port
SOURCE_DBNAME=source_database_name
SOURCE_COLL=source_collection_name
TARGET_URL=mongodb://target_host:port
TARGET_DBNAME=target_database_name
TARGET_COLL=target_collection_name
```

Replace the placeholders with your actual MongoDB connection details.

## Usage

To start the migration process, run:

```
npx ts-node index.ts
```

The script will connect to both the source and target MongoDB instances, read data from the source collection, and write it to the target collection.

## File Structure

- `index.ts`: The main script that orchestrates the migration process.
- `conn.ts`: Contains the `MongoConn` class for managing MongoDB connections and operations.
- `logger.ts`: Provides logging functionality for info and error messages.

## Logging

The `logger.ts` file provides two functions for logging:

```typescript
export const logInfo = (...args: string[]) => {
  console.log(new Date().toLocaleString(), '[INFO]', ...args);
};

export const logError = (...args: string[]) => {
  console.log(new Date().toLocaleString(), '[ERROR]', ...args);
};
```

These functions add timestamps and appropriate tags to log messages.

## Dependencies

To install these dependencies, run `npm install` in the project directory.

## Error Handling

The script includes basic error handling:
- It checks for the presence of all required environment variables before starting the migration.
- Errors during the streaming process are caught and logged.
- The script uses a `Promise` to handle the asynchronous nature of the streaming operation.

## Limitations

- The script performs a simple copy of documents from source to target. It does not handle complex migration scenarios like data transformation or merging.
- There's no built-in mechanism for handling duplicate documents in the target collection.

## Contributing

Contributions to improve the tool are welcome. Please feel free to submit issues or pull requests.

## License

ISC (as specified in package.json)
