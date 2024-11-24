'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kost', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false, // Kolom nama harus diisi
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: false, // Kolom harga harus diisi
      },
      lokasi: {
        type: Sequelize.STRING,
        allowNull: false, // Kolom lokasi harus diisi
      },
      image: {
        type: Sequelize.STRING, // Menyimpan URL gambar kost
        allowNull: true, // Tidak wajib
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'unisex'), // Gender kost: pria, wanita, atau unisex
        allowNull: false, // Kolom gender wajib diisi
      },
      image_preview: {
        type: Sequelize.STRING, // Menyimpan URL gambar preview
        allowNull: true, // Tidak wajib
      },
      deskripsi: {
        type: Sequelize.TEXT, // Kolom untuk deskripsi kost
        allowNull: true, // Tidak wajib
      },
      no_telp_pemilik: {
        type: Sequelize.STRING, // Kolom untuk nomor telepon pemilik
        allowNull: false, // Kolom ini wajib diisi
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Menyimpan waktu pembuatan
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Menyimpan waktu update
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kost');
  }
};
