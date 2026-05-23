export const isMaintainer = (req, res, next) => {
    if (req.user.role !== "maintainer") {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }
    next();
};
