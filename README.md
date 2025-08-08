# Blood Donation Application

## Description
A full-stack MERN application designed to facilitate seamless blood donation processes. The platform connects donors, volunteers, and admins, enabling user registration, blood donation requests, donor management, content management, and role-based access control. It features responsive dashboards, secure JWT authentication, real-time notifications, and intuitive UI for all devices.

## Admin Credentials
- **Email:** swajan@gmail.com   
- **Password:** 123456

## Live Project
[View Live Demo](https://blood-bridge-951f8.web.app/)

## Screenshot
![App Screenshot](https://github.com/swajannaimur/blood-bridge/blob/main/Screenshot%202025-08-08%20152336.png)

## Technologies Used
- React.js
- Node.js
- Express.js
- MongoDB
- Firebase Authentication
- JWT (JSON Web Token)
- Tailwind CSS
- Stripe (for payment integration)


## Core Features
- User registration with role-based default (Donor) and profile management
- Role-based access control (Admin, Donor, Volunteer)
- Blood donation request creation, update, delete with status tracking (pending, inprogress, done, canceled)
- Responsive dashboard with sidebar layout for each user role
- Donor search with filters (blood group, district, upazila)
- Content management with blog creation, publishing, and management by admin/volunteer roles
- Funding/donation system integrated with Stripe payment
- JWT-secured private routes and APIs
- Pagination and filtering on tables for users, requests, and blogs
- Toast/sweet alert notifications for all CRUD and auth operations
- Environment variables to securely manage Firebase and MongoDB credentials
- No default browser alerts; custom notifications used
- Admin can manage users: block/unblock, role assignment (admin, volunteer)
- Volunteer role with limited but important permissions
- Custom 404 page and dynamic routing with private route protection

## Dependencies
- axios
- react-router-dom
- react-toastify
- firebase
- jsonwebtoken
- tailwindcss
- stripe
- jodit-react
- react-modal
- react-paginate
- tanstack/react-query

## Getting Started - Running Locally

1. **Clone the repositories:**

   ```bash
   git clone https://github.com/swajannaimur/client-blood-donation.git

