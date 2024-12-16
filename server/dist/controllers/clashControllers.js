import { ZodError } from "zod";
import { formatError, imageValidator, removeImage, uploadImage, } from "../helper.js";
import { clashSchema } from "../validation/clashValidation.js";
import prisma from "../config/database.js";
const createClash = async (req, res) => {
    try {
        const body = req.body;
        const payload = clashSchema.parse(body);
        if (req.files?.image) {
            const image = req.files?.image;
            const validMsg = imageValidator(image.size, image.mimetype);
            if (validMsg) {
                res.status(422).json({ errors: { image: validMsg } });
                return;
            }
            payload.image = uploadImage(image);
        }
        else {
            res.status(422).json({ errors: { image: "Image is required" } });
            return;
        }
        await prisma.clash.create({
            data: {
                title: payload.title,
                description: payload?.description,
                image: payload?.image,
                user_id: req.user?.id,
                expire_at: new Date(payload.expire_at),
            },
        });
        res.json({ message: "Clash created successfully!" });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
            return;
        }
        console.log(error);
        res
            .status(500)
            .json({ message: "something went wrong, please try again!!" });
        return;
    }
};
const getClashes = async (req, res) => {
    try {
        const clashes = await prisma.clash.findMany({
            where: { user_id: req.user?.id },
            orderBy: {
                id: "asc",
            },
        });
        res.json({ message: "Data Fetched", data: clashes });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Something went wrong.please try again!", data: error });
    }
};
const getClashById = async (req, res) => {
    try {
        const { id } = req.params;
        const clash = await prisma.clash.findUnique({
            where: { id: Number(id) },
            include: {
                ClashItem: {
                    select: {
                        image: true,
                        id: true,
                        count: true,
                    },
                },
                ClashComments: {
                    select: {
                        id: true,
                        comment: true,
                        created_at: true,
                    },
                    orderBy: {
                        id: "desc",
                    },
                },
            },
        });
        res.json({ message: "Data Fetched", data: clash });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Something went wrong.please try again!", data: error });
    }
};
const updateClash = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = clashSchema.parse(body);
        console.log("payload:", payload);
        if (req.files?.image) {
            const image = req.files.image;
            const validMsg = imageValidator(image?.size, image?.mimetype);
            if (validMsg) {
                res.status(422).json({ errors: { image: validMsg } });
                return;
            }
            // * Delete Old Image
            const clash = await prisma.clash.findUnique({
                select: { id: true, image: true },
                where: { id: Number(id) },
            });
            if (clash?.image)
                removeImage(clash?.image);
            payload.image = uploadImage(image);
        }
        await prisma.clash.update({
            data: {
                ...payload,
                expire_at: new Date(payload.expire_at),
            },
            where: { id: Number(id) },
        });
        res.json({ message: "Clash updated successfully!" });
        return;
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
};
const deleteClash = async (req, res) => {
    try {
        const { id } = req.params;
        const clash = await prisma.clash.findUnique({
            select: { image: true, user_id: true },
            where: { id: Number(id) },
        });
        if (clash?.user_id !== req.user?.id) {
            res.status(401).json({ message: "Un Authorized" });
            return;
        }
        if (clash?.image)
            removeImage(clash.image);
        await prisma.clash.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Clash Deleted successfully!" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        return;
    }
};
const createClashItems = async (req, res) => {
    try {
        const { id } = req.body;
        const files = req.files;
        let imgErros = [];
        const images = files?.["images[]"];
        if (images.length >= 2) {
            // * Check validation
            images.map((img) => {
                const validMsg = imageValidator(img?.size, img?.mimetype);
                if (validMsg) {
                    imgErros.push(validMsg);
                }
            });
            if (imgErros.length > 0) {
                res.status(422).json({ errors: imgErros });
                return;
            }
            // * Upload images to items
            let uploadedImages = [];
            images.map((img) => {
                uploadedImages.push(uploadImage(img));
            });
            uploadedImages.map(async (item) => {
                await prisma.clashItem.create({
                    data: {
                        image: item,
                        clash_id: Number(id),
                    },
                });
            });
            res.json({ message: "Clash Items updated successfully!" });
            return;
        }
        res
            .status(404)
            .json({ message: "Please select at least 2 images for clashing." });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong.please try again" });
        return;
    }
};
export { createClash, getClashes, getClashById, updateClash, deleteClash, createClashItems, };
