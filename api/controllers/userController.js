import prisma from "../utils/prisma.js";

export async function addUser(req, res, next) {
  try {
    const body = await req.body;
    console.log(req.body);

    const { name, email } = body;

    await prisma.user.create({
      data: { name, email },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function editUser(req, res, next) {
  try {
    const body = await req.body();

    const { phone, department, id, role, title } = body;

    await prisma.user.update({
      where: { id },
      data: { phone, department, role, title },
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      orderBy: [{ name: "desc" }],
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserInfo(req, res, next) {
  try {
    const email = req.params;
    const userData = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
