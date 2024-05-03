import prisma from "../utils/prisma.js";

export async function getAllCategories(req, res, next) {
  try {
    const cats = await prisma.category.findMany({});

    return res.status(200).json(cats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSingleCategory(req, res, next) {
  try {
    const id = req.params;
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function addCategory(req, res, next) {
  try {
    const body = await req.body;

    const { title, desc, img } = body;

    await prisma.category.create({
      data: { title, desc, img },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function editCategory(req, res, next) {
  try {
    const { id } = req.params;

    const body = await req.body;

    const { title, desc, img } = body;

    await prisma.category.update({
      where: { id },
      data: { title, desc, img },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
