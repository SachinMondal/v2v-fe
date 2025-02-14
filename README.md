# Frontend - Video Transformation App

## Overview

This is the **frontend** of the Video Transformation App, built with **Next.js** and **Tailwind CSS**. It provides an intuitive UI for users to upload videos, apply lip-sync transformations, and download processed videos.

## Features

- Upload videos for processing
- Apply AI-based lip-sync transformations
- View transformation history
- Download processed videos instantly
- Responsive UI for mobile and desktop

## Tech Stack

- **Next.js** (React Framework)
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)
- **Uploadcare API** (File Uploads)
- **Cloudinary API** (Video Storage)

## Installation & Setup

### 1. Clone the repository:

```sh
git clone https://github.com/SachinMondal/v2v-fe.git
cd video-transform-frontend
```

### 2. Install dependencies:

```sh
yarn install  # or npm install
```

### 3. Set up environment variables:

Create a `.env.local` file and add the following:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=your_uploadcare_public_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### 4. Start the development server:

```sh
yarn dev  # or npm run dev
```

## Folder Structure

```
frontend/
│── src/
│   ├── components/     # UI Components
│   ├── pages/          # Next.js Pages (Home, History, etc.)
│   ├── context/        # React Context for state management
│   ├── utils/          # Helper functions
│── public/             # Static assets
│── .env.local          # Environment variables
│── next.config.js      # Next.js configuration
│── package.json        # Project dependencies
│── README.md           # Project documentation
```

## Functionality Overview

### 1. Upload Video
- Allows users to upload a video file for transformation.
- Uses **Uploadcare** to handle file storage.

### 2. Apply Lip-Sync Transformation
- Users can select an audio file to sync with the uploaded video.
- API request is sent to the backend to process the transformation.

### 3. View History
- Displays previously transformed videos.


### 4. Download Transformed Video
- Direct one-click download.
- Ensures seamless downloading.

## Contribution

Feel free to submit issues and pull requests to improve the project.

## License

MIT License

