# Zywa Card Status API

## Tech Stack

- **Node.js:** Used as the server-side runtime environment.
- **Express:** A minimal and flexible web application framework for Node.js.
- **SQLite:** A lightweight, file-based database used for storing card information.
- **csv-parser:** A CSV parsing library for Node.js.

I decided to use a lightweight database and a minimal web framework to keep the codebase simple and easy to understand. Also, I am comfortable in working with NodeJS and used it in previous projects.

## Overview

The API exposes an endpoint `/get_card_status` to query card status based on a user's phone number or card ID.

## Approach

- **Database Structure:** SQLite is used as the database, and the schema includes columns for `id`, `phone_number`, `status`, `timestamp`, and `comment`.
- **CSV Parsing:** The `csv-parser` library is used to parse CSV files, and the `multer` library is employed for handling file uploads.
- **Dynamic CSV Header:** The code dynamically detects the correct header for the phone number column ('User Mobile' or 'User Contact').
- **Update or Insert Logic:** The implementation checks if a record exists based on the card ID and compares timestamps to determine whether to update or insert new data.

1. A simple SQLite database is used to store card information.
2. The database is seeded with the data from csv files which are available in the `data` folder.
3. The csv files are processed in the flow of Pickup -> Delivery -> Delivery Exceptions -> Return.
4. The API exposes an endpoint `/get_card_status` to query card status based on a user's phone number or card ID.

## Getting Started

1. Install dependencies: `npm install`
2. Run the server: `npm start`

## Usage

### Get Card Status

- **Endpoint:** `/get_card_status`
- **Query Parameters:**
  - `phone_number` or `card_id`
- **Response:**
  - `card_id`: The ID of the card.
  - `status`: The status of the card.
  - `contact`: The phone number associated with the card.
  - `comment`: The comment associated with the card.
  - `timestamp`: The timestamp of the last update.

## Further Improvements

Addition of csv files to the database can be improved in the following ways:

- An upload_csv endpoint can be created which can be used to with an UI Interface which can be provided to agents or the partner companies to upload the csv files with the status.
- A cron job can be created which can run at a specific time and can check for the csv files in a specific folder and can upload the csv files to the database.
