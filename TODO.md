<!--
 Copyright (c) 2023 Sanjib Kumar Sen <mail@sanjibsen.com>

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# TODO

## Initial Setup

- [ ] Check if git is installed
- [ ] Check if directory exists
  - [ ] Check if the config file exists
    - [ ] Check if the masterRepo is set in the config
      - [ ] Check if the masterRepo is a valid git repository
        - [ ] Check if the masterRepo is cloned
          - [ ] If cloned git pull the masterRepo
          - [ ] If not cloned git clone the masterRepo

## Git Push

- [ ] Check if the env file exists
- [ ] Check the env file name and location. Defaults to `*/.env` and `*/.env.local`
- [ ] Check seperators and quotes in the env file
  - [ ] Check seperator
  - [ ] Check quote
    - [ ] Seperate Key and Value
    - [ ] Ask for Password (Encryption Key)
    - [ ] Re-Enter the Password
      - [ ] Encrypt only the value
        - [ ] Git Pull on masterRepo
        - [ ] Save the String to File (Follow the Relative Directory Structure)
        - [ ] Move the File to masterRepo and Git Push

## Git Pull

- [ ] Git Pull on masterRepo
- [ ] Ask for Password, Decrypt the file and move to the relative directory

## utils

- [ ] encrypt+decrypt a file / directory from command line
- [ ] encrypt+decrypt a string from command line
