const Kost = require("../models/Kost");

// GET: Fetch all kosts
exports.getAllKosts = async (req, res) => {
    try {
        const kosts = await Kost.findAll();
        res.status(200).json(kosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch kost data" });
    }
};


exports.getKostById = async (req, res) => {
    try {
        const kost = await Kost.findByPk(req.params.id);
        if (!kost) {
            return res.status(404).json({ message: "Kost not found" });
        }
        res.status(200).json(kost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch kost data" });
    }
};

// POST: Create a new kost
exports.createKost = async (req, res) => {
    try {
        const {
            nama,
            harga,
            lokasi,
            image,
            gender,
            image_preview,
            deskripsi,
            no_telp_pemilik,
        } = req.body;
        const newKost = await Kost.create({
            nama,
            harga,
            lokasi,
            image,
            gender,
            image_preview,
            deskripsi,
            no_telp_pemilik,
        });
        res.status(201).json(newKost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create kost" });
    }
};

// PUT: Update an existing kost
exports.updateKost = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedKost = await Kost.update(req.body, { where: { id } });
        if (!updatedKost[0]) {
            return res
                .status(404)
                .json({ message: "Kost not found or no changes made" });
        }
        res.status(200).json({ message: "Kost updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update kost" });
    }
};

// DELETE: Delete a kost
exports.deleteKost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedKost = await Kost.destroy({ where: { id } });
        if (!deletedKost) {
            return res.status(404).json({ message: "Kost not found" });
        }
        res.status(200).json({ message: "Kost deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete kost" });
    }
};
