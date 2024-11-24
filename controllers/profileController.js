const User = require("../models/User");

// Fungsi untuk mengambil profil pengguna
const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userId = req.user.id; // Mendapatkan ID dari pengguna yang sudah terautentikasi
        const user = await User.findOne({
            where: { id: userId },
            attributes: ["name", "email", "about", "role"], // Ambil detail yang dibutuhkan
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fungsi untuk memperbarui profil pengguna
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, about, profileImage } = req.body;

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Perbarui data profil
        user.name = name || user.name;
        user.about = about || user.about;
        user.profileImage = profileImage || user.profileImage;

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { getProfile, updateProfile };
