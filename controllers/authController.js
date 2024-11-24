const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Memetakan username ke name
        const newUser = await User.create({
            name: username, // Pemetaan dari username ke name
            email,
            password,
            role,
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating user",
            error: error.message,
        });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari user berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Email atau password salah" });
        }

        // Cek password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ message: "Email atau password salah" });
        }

        // Buat JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login berhasil", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body; // Ambil password lama dan baru dari body request
    const userId = req.user.id;  // Ambil user ID dari request yang sudah terautentikasi

    try {
        // Cari user berdasarkan ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verifikasi password lama dengan password yang ada di database
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Enkripsi password baru
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password dengan password baru yang sudah dienkripsi
        user.password = hashedNewPassword;
        await user.save(); // Simpan perubahan ke database

        res.status(200).json({ message: "Password successfully updated" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
