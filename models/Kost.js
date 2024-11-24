const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Kost = sequelize.define(
    "Kost",
    {
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        harga: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lokasi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM("male", "female", "unisex"),
            allowNull: false,
        },
        image_preview: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        no_telp_pemilik: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Kost;
