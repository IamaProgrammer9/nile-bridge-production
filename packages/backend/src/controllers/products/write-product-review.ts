import { Request, Response } from "express";
import { mongoPrisma } from "../../lib/mongo.js";
import { prisma } from "../../lib/prisma.js";
import { getUserFromRequest } from "../utils.js";

export const writeProductReview = async (req: Request, res: Response) => {
    const { productId, rating, comment } = req.body;
    const userId = (req as any).userId;
    const user = await getUserFromRequest(req);
    if (!user) {
        res.status(401).send('Not authenticated');
        return;
    }

    // Check if the user already wrote a review about the product
    const existingReview = await mongoPrisma.productReview.findUnique({
        where: {
            userId_productId: {
                userId: userId,
                productId: productId,
            },
        },
    });

    if (existingReview) {
        res.status(400).json("Review already exists");
        return;
    }
    
    // Create a new review
    const newReview = await mongoPrisma.productReview.create({
        data: {
            userId: userId,
            productId: productId,
            rating: rating,
            comment: comment,
            userName: user.name,
        },
    });

    res.status(200).json('Review created successfully');
};
