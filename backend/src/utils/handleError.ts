import { Response } from "express";

export const handleControllerError = (
  res: Response,
  error: any,
  defaultMessage: string
) => {
  console.error("Controller Error:", error);

  if (error?.code === "P2002") {
    const targets = error?.meta?.target;
    const field = Array.isArray(targets) ? targets.join(", ") : "email/field";
    return res.status(400).json({
      message: `A record with this ${field} already exists. Please use a different value.`,
    });
  }

  if (error?.code === "P2025") {
    return res.status(404).json({
      message: "Requested record was not found.",
    });
  }

  const rawMsg = error?.message;
  let message = defaultMessage;

  if (typeof rawMsg === "string" && !rawMsg.includes("Invalid `prisma")) {
    message = rawMsg;
  }

  return res.status(400).json({
    message,
  });
};
