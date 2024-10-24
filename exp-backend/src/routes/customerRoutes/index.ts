import express from 'express';
import authRoutes from './customerAuthRoutes';
// import leadRoutes from './leadRoutes';
// import contactRoutes from './contactRoutes';
// import noteRoutes from './noteRoutes';
// import teamRoutes from './teamRoutes';
// import organizationRoutes from './organizationRoutes';
// import fileRoutes from './fileRoutes';
// import userRoutes from './userRoutes';

const router = express.Router();

router.use('/customerauth', authRoutes);
// router.use('/leads', leadRoutes);
// router.use('/contacts', contactRoutes);
// router.use('/notes', noteRoutes);
// router.use('/teams', teamRoutes);
// router.use('/organizations', organizationRoutes);
// router.use('/files', fileRoutes);
// router.use('/users', userRoutes);


export default router;
