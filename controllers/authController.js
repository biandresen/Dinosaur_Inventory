import "dotenv/config";

export const authController = {
  checkAdminPassword: (req, res) => {
    const { password } = req.body;
    console.log("Entered password:", password);
    console.log("Correct password:", process.env.ADMIN_PASSWORD);

    if (password === process.env.ADMIN_PASSWORD) {
      res.json({ authenticated: true });
      console.log("Access granted");
    } else {
      res.json({ authenticated: false });
      console.log("Access denied");
    }
  },
};
