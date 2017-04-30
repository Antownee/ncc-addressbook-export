# NCC to Nanowallet address book exporter

Utility to help in moving addresses from NCC into a readable Nanowallet adb file 

### NOTE: BEFORE RUNNING THIS UTILITY, MAKE SURE YOU HAVE YOUR LOCAL NCC INSTANCE RUNNING.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You'll need to ave installed the following:

```
node.js
```

## Installing

You have 2 options here:
* Clone repo and run on your local machine
* Download the already compiled windows binary and simply run it from your cmd prompt

### Running compiled binary
Head over to the releases page and download the  [latest] (https://github.com/Antownee/ncc-addressbook-export/releases) release

### Clone repo

Clone this repo on to your machine and cd into the repo folder

```
git clone https://github.com/Antownee/ncc-addressbook-export.git ncc-exporter
cd ncc-exporter
```

Install required packages

```
npm install
```
**Before running the script, make sure your local NCC instance is running!** 
Run the script

```
node app.js addressbookname password
```

## Running the tests

TODO


## Author

* **Anthony Muisyo** 

## License

This project is licensed under the MIT License

## Acknowledgments

NEM community
