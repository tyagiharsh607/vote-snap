import prisma from "../config/database.js";
export const verifyEmail = async (req, res) => {
    const { email, token } = req.query;
    if (email && token) {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        if (user) {
            if (token === user.email_verify_token)
                await prisma.user.update({
                    data: {
                        email_verify_token: null,
                        email_verified_at: new Date().toISOString(),
                    },
                    where: { email: email },
                });
            res.redirect(`${process.env.CLIENT_APP_URL}/login`);
            return;
        }
        res.redirect("/verify/error");
        return;
    }
    res.redirect("/verify/error");
    return;
};
export const verifyError = async (req, res) => {
    res.render("auth/verifyEmailError");
    return;
};
