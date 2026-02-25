# Project Tasks & Features Checklist - DigiNex Tuition Management System

This document outlines the core features and modules required to build a complete Tuition Class Management System.

## 1. User Management (System Access)

- [x] **Admin Dashboard**: Overview of system stats (Income, Active Students, etc.).
- [x] **User Management Page**: Add/Edit/Delete system users (Admins, Staff, Managers).
- [x] **Role-Based Access Control (RBAC)**: Define exact permissions for each role (e.g., Staff cannot delete payments).
- [x] **Profile Settings**: Allow users to update their own password and basic details.

## 2. Student Management

- [x] **Student Registration**: Form to capture student details (Name, School, Grade, Parent Contact).
- [x] **Student Profile View**: Detailed view of a student's history (Payments, Attendance, Marks).
- [x] **ID Card Generation**: Printable ID cards with QR codes./Barcode) for students.
- [x] **Search & Filter**: Advanced filtering (by Grade, Subject, Payment Status).
- [x] **Bulk Import/Export**: Upload students via CSV/Excel.

## 3. Tutor (Teacher) Management

- [x] **Tutor Registration**: Capture tutor details and subjects they teach.
- [x] **Tutor Agreement/Commission**: Define the payment percentage or fixed rate for each tutor.
- [x] **Tutor Dashboard**: (Optional) Separate login for tutors to view their class schedules and income.
- [x] **Tutor Payments**: Calculate and record monthly payments to tutors based on student fees.

## 4. Class & Schedule Management

- [x] **Class Creation**: Define classes (Subject + Grade + Teacher + Hall).
- [x] **Class Scheduling**: Set days and times for weekly classes (Recurring info).
- [x] **Hall Management**: Manage physical classrooms/halls to prevent double booking.
- [x] **Class Fees**: Set monthly fees for each class.

## 5. Attendance Management

- [x] **Mark Attendance**: Manual entry or QR Code scanning for student arrival.
- [x] **Real-time SMS**: Send SMS to parents immediately when a student attends/leaves class. (Implemented as Upgrade Feature)
- [x] **Attendance Reports**: View attendance percentage per student or per class.
- [x] **Absence Tracking**: Identify students who have missed consecutive classes.

## 6. Payment & Finance Management

- [x] **Fee Collection**: Interface to accept monthly fees (Cash/Card/Online).
- [x] **Invoice/Receipt Generation**: Print thermal or A4 receipts for payments.
- [x] **Payment History**: View past payments for any student.
- [x] **Due Payments**: List students who haven't paid providing easy follow-up.
- [x] **Daily Income Report**: Summary of cash collected at the end of the day.
- [x] **Expenses Recording**: Record institute expenses (Electricity, Water, Cleaning, etc.).

## 7. Exam & Results Management

- [x] **Exam Creation**: Schedule exams for classes.
- [x] **Marks Entry**: Enter marks for students.
- [x] **Progress Reports**: Generate simple report cards or rank lists. (Implemented as Upgrade Feature)
- [x] **SMS Results**: Send exam results to parents via SMS. (Implemented as Upgrade Feature)

## 8. Communication & Notifications

- [x] **SMS Integration**: Send auto-SMS for payments, attendance, etc. (Implemented as Upgrade Feature)
- [x] **Bulk SMS**: Send custom messages to all students or specific batches. (Implemented as Upgrade Feature)
- [x] **Email Notifications**: Send monthly reports or payment receipts via email. (Implemented as Upgrade Feature)

## 9. Reporting & Analytics

- [x] **Financial Reports**: Monthly P&L (Profit & Loss) statement.
- [x] **Student Growth Chart**: Visual graph of new enrollments over time.
- [x] **Tutor Performance**: Analyze which classes are most popular/profitable.

## 10. System Settings & Configuration

- [x] **General Settings**: Institute Name, Logo, Contact info.
- [x] **Backup & Restore**: Manual and automated database backup options. (Implemented as Upgrade Feature)
- [x] **Audit Logs**: Track who did what in the system (Security).
