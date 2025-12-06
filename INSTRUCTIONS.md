# Tummala Motors - Setup Instructions

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   ```

3. **Set Up Database**
   ```bash
   npx prisma generate
   npm run db:push
   npm run db:seed
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:seed` - Seed database with sample data

## Sample Testing Data

<!-- VIN: 1FTEW1CP4RFD54321

Description: The 2024 F-150 XLT combines rugged capability with modern tech. Built with a high-strength, military-grade aluminum-alloy body, it features a 12-inch productivity screen, Pro Power Onboard, and best-in-class towing capacity.

Manufacturer Name: Ford

Model: F-150 XLT

Image Links (comma or newline separated): https://images.dealersync.com/2869/Photos/1131627/wm_a7fbf957f701492fb3547d639e203097_1131627.jpg?format=webp&width=2410&_=22c1bc3eb4a7e2ff6c0c870119497582e751368f -->

<!-- VIN: 2HKRW1H53NH456789

Description: The 2022 Honda CR-V EX offers a spacious interior and excellent fuel economy. Powered by a 1.5L turbocharged engine producing 190 hp, it features the Honda Sensing safety suite, Apple CarPlay/Android Auto integration, and a comfortable, family-friendly cabin.

Manufacturer Name: Honda

Model: CR-V

Image Links: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVuV7MATnEdsy_KpvXrrImxQy5q9lD8sP5cQ&s -->

## Video Demonstration Link : https://docs.google.com/videos/d/192TFekvBRRLjb-5E1E3Vo9prbtSKlgJLMMnPMWhqA2o/edit?usp=sharing