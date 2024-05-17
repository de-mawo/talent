import prisma from "../utils/prisma.js";

export async function addMenu(req, res, next) {
  try {
    const body = await req.body;

    const {
      title,
      shortDescr,
      longDescr,
      price,
      sellingPrice,
      image,
      prepType,
      category,
    } = body;

    await prisma.menu.create({
      data: {
        title,
        shortDescr,
        longDescr,
        price,
        sellingPrice,
        image,
        prepType,
        category,
      },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMenus(req, res, next) {
  try {
    const users = await prisma.menu.findMany({});

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getFavMenus(req, res, next) {
  const body = await req.body;
  const { menuIds } = body;

  try {
    const menus = await prisma.menu.findMany({
      where: {
        id: {
          in: menuIds,
        },
      },
    });

    return res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
