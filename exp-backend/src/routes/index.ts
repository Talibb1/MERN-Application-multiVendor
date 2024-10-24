import express from 'express';
import authRoutes from './customerRoutes/customerAuthRoutes';
import customerRoutes from './customerRoutes/customerRoutes';
import categoryRoutes from './vendorRoutes/categoryRoutes';

const router = express.Router();

// Customer
router.use('/customerauth', authRoutes);
router.use('/customer', customerRoutes);



// Vendor
router.use('/category', categoryRoutes);




export default router;