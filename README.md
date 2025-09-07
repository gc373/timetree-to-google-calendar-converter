# TimeTree to Google Calendar Converter
[README.ja](./)
![TimeTree to Google Calendar Converter Banner]

A simple web application to import a TimeTree public calendar to your Google Calendar. This project is built with **Vite** and **React**.

---

## Features

-   **Seamless Integration**: Converts and transfers TimeTree public calendar events directly to your Google Calendar.
-   **User-Friendly Interface**: Just paste your TimeTree public calendar URL and click a button.
-   **Open Source**: The project is open-source, so anyone can inspect the code, contribute, or run it on their own.

---

## How to Use

1.  Navigate to the live application on GitHub Pages.
2.  Copy the URL of a public TimeTree calendar (e.g., `https://timetreeapp.com/public_calendars/hbn_187`).
3.  Paste the URL into the input field on the page.
4.  Click the "Convert to Google Calendar" button.
5.  Follow the on-screen instructions to authorize and add the events to your Google Calendar.

---

## Tech Stack

-   **Frontend**: React (with Vite)
-   **API Integration**: TimeTree API, Google Calendar API
-   **Styling**: Plain CSS

---

## Getting Started

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/timetree-to-google-calendar-converter.git](https://github.com/your-username/timetree-to-google-calendar-converter.git)
    cd timetree-to-google-calendar-converter
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or yarn install
    ```

### Running Locally

To start the development server:

```bash
npm run dev
# or yarn dev
```
The application will be available at http://localhost:5173.

Building for Production
To build the static site for production:

```bash
npm run build
# or yarn build
```
The build files will be generated in the dist directory. You can then deploy these files to GitHub Pages.

# Contributing
We welcome contributions! Feel free to open an issue or submit a pull request.

# License
This project is licensed under the MIT License.