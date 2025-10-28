
<h1 align="center"> GigBook </h1>

<p align="center">
<img src="https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/">
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/">
<img src="https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org">
<img src="https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io">
</p>

![GigBook Preview](/public/landing2.png)
**<p align="center">Fivver for Gigs - https://gig-book.vercel.app</p>**



GigBook is a modern full-stack web application designed to bridge the gap between **artists** and **venues** for live event bookings.

Think **Fiverr**, but for gigs — where performers can showcase their talent, and venues can discover and book them easily.

---

## 🛠️ Tech Stack
|  Category | Technology  |
|-----------|---------|
| **Frontend** | Next.js 14 (App Router) + TailwindCSS + shadcn/ui |
| **Backend** | Express + Prisma + PostgreSQL|
| **State Management** | Redux Toolkit + React Hook Form + Zod |
| **Media Uploads** | Cloudinary |
| **Authentication** | JWT + Role-based routing (Artist / Venue) |
| **Monorepo Setup** | Turborepo (apps/frontend + apps/backend) |

---

## Features
-  Secure Login & Role-based Dashboards  
-  Artist Profiles with Media Uploads  
-  Venue Profiles and Booking Management  
-  Create, Accept, and Reject Bookings  
-  Cloudinary Uploads with Progress Tracking  
-  Optimistic Updates & Toast Notifications

---

## Environment Variables

### Required Backend Variables

```env
DATABASE_URL       # PostgreSQL connection string
JWT_SECRET        # Secret key for JWT signing
PORT              # Server port (default: 4000)
NODE_ENV          # Environment (development/production)
FRONTEND_URL      # Frontend URL for CORS
```

### Required Frontend Variables

```env
NEXT_PUBLIC_API_URL                    # Backend API URL
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME      # Cloudinary cloud name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET   # Cloudinary upload preset
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open Pull Request

---

## Connect with me 

* Email: [eeshmidha@80@gmail.com](mailto:eeshmidha80@gmail.com)
* X : [eeshmidha1](https://x.com/eeshmidha1)

**Star this repo if you find it helpful!**
