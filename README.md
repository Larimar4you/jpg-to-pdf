# JPG to PDF Converter

A lightweight, browser-based application for converting JPG and JPEG images into PDF documents.

Built with vanilla JavaScript, HTML5, and CSS3, the application provides a straightforward interface for selecting, previewing, and converting multiple images into a single PDF file.

All file processing is performed locally in the browser without requiring a backend server or user registration.

## Overview

JPG to PDF Converter is a client-side web application designed to simplify document creation from image files.

Users can upload multiple images, review their selection, remove unnecessary files, and generate a PDF document with a single click.

The application automatically scales each image to fit an A4 page while maintaining its original aspect ratio.

## Features

- **Drag-and-drop upload:** Add images directly through the browser interface.
- **Multiple file selection:** Process multiple JPG/JPEG images in one conversion.
- **Image preview:** Display thumbnails of selected images before conversion.
- **File removal:** Remove individual images from the selection.
- **File validation:** Reject unsupported file formats and display an error message.
- **Automatic image scaling:** Preserve image proportions when fitting images to A4 pages.
- **Multi-page PDF generation:** Place each selected image on a separate PDF page.
- **Client-side processing:** Generate PDF documents without transferring images to an application server.
- **Direct download:** Download the generated document as `output.pdf`.

## Technology Stack

| Technology             | Description                             |
| ---------------------- | --------------------------------------- |
| HTML5                  | Application structure and file input    |
| CSS3                   | User interface styling                  |
| JavaScript (ES6+)      | Application logic and DOM manipulation  |
| jsPDF                  | Client-side PDF document generation     |
| FileReader API         | Reading local image files               |
| File API               | Accessing and validating selected files |
| HTML Drag and Drop API | Handling drag-and-drop file uploads     |

The project also includes Sortable.js as a dependency for potential image reordering functionality.

## Project Structure

```text
jpg-to-pdf-converter/
├── index.html
├── style.css
├── script.js
└── README.md
```

**File descriptions**

- `index.html` — Defines the application structure and loads external dependencies.
- `style.css` — Contains the visual styling and layout.
- `script.js` — Implements file management, validation, previews, and PDF generation.
- `README.md` — Provides project documentation.

## Installation

### Prerequisites

A modern web browser with JavaScript enabled is required.

No backend, package manager, or build process is necessary.

### Clone the Repository

```bash
git clone https://github.com/Larimar4you/YOUR_REPOSITORY.git
```

Navigate to the project directory:

```bash
cd YOUR_REPOSITORY
```

### Run the Application

Open `index.html` in a browser.

Alternatively, run the project using the Live Server extension in Visual Studio Code.

An internet connection is required to load external JavaScript libraries from their CDN endpoints.

## Usage

1. Open the application in your browser.
2. Drag and drop JPG/JPEG images into the designated upload area or select files manually.
3. Review the image previews.
4. Remove any unwanted images from the selection.
5. Click **Create PDF**.
6. Download the generated `output.pdf` document.

Each image is placed on a separate A4 page.

## File Validation

The application validates selected files using their MIME types.

Only files with the MIME type `image/jpeg` are accepted.

Files with unsupported formats are excluded from the conversion process, and a notification is displayed to the user.

Validation is performed for both manually selected files and files added through drag and drop.

**Note:** MIME-type validation provides basic format filtering but does not guarantee that a file's contents are valid.

## PDF Generation

PDF generation is implemented using the jsPDF library.

The conversion process consists of the following steps:

1. Read the selected image using the FileReader API.
2. Convert the image into a Data URL.
3. Load the image to determine its dimensions.
4. Calculate scaling factors based on A4 page dimensions.
5. Preserve the image's aspect ratio.
6. Center the image on the PDF page.
7. Add additional pages for subsequent images.
8. Generate and download the resulting PDF document.

The application uses millimeters as the measurement unit and A4 as the default document format.

## Architecture

The application follows a simple client-side architecture.

**User Interface**

HTML and CSS provide the upload area, file previews, delete controls, and conversion button.

**File Management**

JavaScript manages selected files in an in-memory array, handles user interactions, and validates file formats.

**Document Generation**

jsPDF converts selected images into a multi-page PDF document.

**Output**

The generated PDF is downloaded directly through the browser.

The application does not require REST APIs, databases, or server-side image processing.

## Privacy and Data Handling

The conversion process takes place locally within the user's browser.

Selected images are not uploaded to an application backend.

File data is maintained temporarily in browser memory during the conversion process.

The generated PDF is downloaded directly to the user's device.

External JavaScript dependencies are loaded through CDN services.

## Limitations

The current implementation has the following limitations:

- Only JPG and JPEG images are accepted.
- PDF pages use the A4 format.
- The output filename is fixed to `output.pdf`.
- Image compression settings are not configurable.
- Conversion performance depends on available browser memory and device resources.
- File type validation relies on browser-provided MIME information.

## Future Improvements

Potential enhancements include:

- Image reordering before PDF generation.
- Support for additional image formats such as PNG and WebP.
- Custom PDF page sizes and orientation.
- Configurable image compression.
- Custom output filenames.
- File size validation.
- Improved error handling for corrupted files.
- Automated testing for file validation and conversion workflows.

## Author

**Larimar4you**

Software Engineering & Artificial Intelligence Student  
Fullstack Developer

GitHub: [github.com/Larimar4you](https://github.com/Larimar4you)

## License

No license has been specified for this project.

All rights are reserved unless a license is added to the repository.
