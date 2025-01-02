# Project To-Do List

## Overview
This document outlines all the tasks and challenges that Rein and Carl encountered during the development process.

---

## Backend To-Do List (Carl)

### User Authentication
- [x] User Authentication
- [x] Admin Authentication

### Admin Side
- [x] User CRUD [USER TAB]
- [x] Add Worker [WORKER TAB]
- [x] View All Workers [WORKER TAB]
- [x] View A Specific Worker [WORKER TAB]
- [x] Update Worker Information [WORKER TAB]
- [x] Delete Worker / Set Role to User Again [WORKER TAB]
- [x] Set User / Worker Status to Active [USER/WORKER TAB]

### User - Appointments
- [x] Complete Backend Logic for Booking User
- [x] Backend Validation to Prevent Double Bookings
---

## Frontend To-Do List (Rein)

### User Authentication
- [ ] **Password Reset**: Notify user that they received an email after checking if their account exists.
- [ ] **Frontend Route**: Implement route for password resetting.

### Admin Side
- [ ] **Search and Filter**: Implement search and filter functionality.  
  [Tutorial](https://www.youtube.com/watch?v=xAqCEBFGdYk)

### User Appointments
- [ ] Route a Specific Service to their Specific Forms. Example Frontend Route: /book-appointment?serviceId=677308b87666bcfcbd5de926

## Worker Creation
- [ ] Time Availability is Based on Worker Service Category when Adding a Worker (nasa gdocs yung time availability)
---

## Backend / Frontend Connection To-Do List (Carl / Rein)

- [ ] **Request for All User List** (ADMIN)
- [ ] **Connection on Password Reset/Update** (USER)
- [ ] **Connection on Adding a User** (ADMIN)
- [ ] **Connection on Viewing the Profile of a User** (ADMIN)
- [ ] **Connection on Reading Specific User Data** (ADMIN)
- [ ] **Connection on Updating Specific User Data** (ADMIN)
- [ ] **Connection on Deleting User** (ADMIN)
- [ ] **Connection on Soft Deleting of User** (ADMIN)
- [ ] **Connection on Getting Services List and Assigning their Services IDs** (ADMIN)

---

## System Limitations
- Only one worker is allowed per service category.
